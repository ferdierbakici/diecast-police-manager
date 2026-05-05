# Recently Available (Status Changed) Implementation

## Genel Bakış

Bu güncelleme, **"Recently Available"** bölümünü **sadece yeni eklenen araçlar** yerine **statüsü değişen (Not Available/Ordered/To Process → Available) araçları** gösterecek şekilde değiştirir.

Hedef: Son 10 aracın statusunun "Available"a değiştiğini göster.

---

## Değişiklikler

### 1. SQLite (Desktop) - ✅ Tamamlandı

#### Veritabanı Migration
- `migrate_status_tracking.py` scripti çalıştırıldı
- 2 yeni kolon eklendi:
  - `vehicles.previous_status` (VARCHAR(50)) - önceki statusu kaydetme
  - `vehicles.status_changed_at` (DATETIME) - statusun ne zaman değiştiğini kaydetme

#### Core Model Güncelleme
- [core/models.py](../core/models.py) güncellendi:
  - Vehicle modeline yeni alanlar eklendi
  - `to_dict()` ve `from_dict()` metodları güncellendi

#### Data Manager Güncelleme
- [managers/data_manager.py](../managers/data_manager.py) güncellendi:
  - `update_vehicle()` metodunda status değişimi takip eklendi
  - Yeni method: `get_recently_status_changed_to_available(limit=10)` - Web API'sinde kullanılacak

#### Nasıl Çalışır?
```
Vehicle statüsü update edilirken:
1. Eski status'u `previous_status`'a kaydet
2. Şu anki zamanı `status_changed_at`'a kaydet
3. Log: "Vehicle 123 status change: Ordered → Available"
```

---

### 2. Supabase (Web) - 🔧 Yapılması Gerekli

#### Adım 1: SQL Migration Çalıştır
Supabase Dashboard → SQL Editor → `supabase_migration_status_tracking.sql` dosyasındaki SQL'i yapıştır ve çalıştır

OR Supabase CLI kullanarak:
```bash
supabase migration new add_status_tracking
# Dosyaya SQL'i yapıştır
supabase db push
```

#### Adım 2: Web App Güncelleme
- [src/app/page.tsx](src/app/page.tsx) güncellendi:
  - `fetchRecentlyAvailable()` fonksiyonu değiştirildi
  - Artık status DEĞIŞEN available araçları çekiyor

---

## Kurulum Adımları

### Desktop Uygulaması

```bash
# 1. Migration'ı çalıştır (zaten yapıldı)
python migrate_status_tracking.py ./data/collection.db

# 2. Uygulamayı restart et
# Status değişiklikleri otomatik olarak kaydedilecek
```

### Web Uygulaması

```bash
# 1. Supabase Dashboard'a git:
# https://app.supabase.com/projects/yzvsfzkksmvwaseudkrq/sql/new

# 2. SQL Editor'de şunu çalıştır:
ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS previous_status VARCHAR(50);

ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS status_changed_at TIMESTAMP;

UPDATE vehicles 
SET status_changed_at = updated_at 
WHERE status_changed_at IS NULL;

UPDATE vehicles 
SET previous_status = availability_status 
WHERE previous_status IS NULL;

CREATE INDEX IF NOT EXISTS idx_status_changed_at 
ON vehicles (status_changed_at DESC);

CREATE INDEX IF NOT EXISTS idx_recently_available 
ON vehicles (availability_status, previous_status, status_changed_at DESC);

# 3. Web uygulamasını deploy et
npm run build
npm run deploy
```

---

## Veri Akışı

```
Desktop (SQLite):
  Aracı Edit → Status Değiş (Ordered → Available)
       ↓
  update_vehicle() → previous_status=Ordered, status_changed_at=NOW()
       ↓
  get_recently_status_changed_to_available() → "Recently Available" için API
       ↓
  Sync/Export ile Supabase'e gönder

Web (Supabase):
  Sync'den gelen veriler → vehicles tablosunda previous_status, status_changed_at güncellenir
       ↓
  fetchRecentlyAvailable() → Son 10 status değişen available araç
       ↓
  Web sayfasında gösteril
```

---

## Test Etme

### Desktop Tarafında Test

```python
from managers.data_manager import DataManager

dm = DataManager()

# 1. Bir aracı Available'a değiştir
dm.update_vehicle(123, {"availability_status": "Available"})

# 2. Recently changed to available araçları göster
recently_available = dm.get_recently_status_changed_to_available(limit=10)
for v in recently_available:
    print(f"{v['model_name']}: {v['previous_status']} → {v['availability_status']}")
    print(f"  Changed at: {v['status_changed_at']}")
```

### Web Tarafında Test

Web tarayıcıda:
1. "Recently Available" bölümünü aç
2. Desktop'ta bir araç statusunu Available'a değiştir
3. Sync et
4. Sayfayı refresh et
5. Yeni araç "Recently Available" bölümünde görülmeli

---

## Notlar

- ✅ Desktop: Tüm statuslar (Available, Ordered, To Process, Not Available) destekleniyor
- ⏳ Web: Supabase migration çalıştırıldıktan sonra çalışacak
- 📊 Veri: Son 10 araç gösteriliyor (limit=10 ile ayarlanabilir)
- 🔔 Senkronizasyon: Desktop'tan Supabase'e aktarım sırasında bu alanlar da transfer edilir

---

## Sorun Giderme

### "fetchRecentlyAvailable error" Hatası
- Supabase migration'ı çalıştırdığını kontrol et
- Supabase SQL Editor'de verification query'lerini çalıştır:
  ```sql
  SELECT * FROM vehicles 
  WHERE availability_status = 'Available' 
    AND previous_status != 'Available' 
    AND previous_status IS NOT NULL
  ORDER BY status_changed_at DESC 
  LIMIT 10;
  ```

### "Recently Available" Bölümü Boş
- Yapılmış status değişimlerini kontrol et
- Sync'in çalışıp çalışmadığını kontrol et
- Desktop'ta status değişim log'larını kontrol et

---

## Gelecek İyileştirmeler

- [ ] Status değişim history tablosu ekle (audit trail)
- [ ] Ne zaman from which status'a değiştiğinin gösterilmesi
- [ ] Status değişim istatistikleri dashboard'ı
