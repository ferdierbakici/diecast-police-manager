# "Recently Available" Feature - Status Changed Implementation

## 📋 Özet

**Hedef**: Web sayfasında "Recently Available" bölümünü, sadece **yeni eklenen araçlar** yerine **durumu son zamanlarda değişen (Not Available/Ordered/To Process → Available) araçları** göstermek.

**Sonuç**: Son 10 aracının statusu başka birinden Available'a değiştirildi gösterilecek.

---

## ✅ Yapılan Değişiklikler

### 🖥️ Desktop Uygulaması (SQLite)

#### 1. Veritabanı Migrasyonu
- **Script**: `migrate_status_tracking.py`
- **Status**: ✅ Çalıştırıldı
- **İçerik**:
  ```sql
  ALTER TABLE vehicles ADD COLUMN previous_status VARCHAR(50);
  ALTER TABLE vehicles ADD COLUMN status_changed_at DATETIME;
  ```
- **Sonuç**: 2659 kayıt güncellendi

#### 2. Model Güncellemesi
- **Dosya**: `core/models.py`
- **Değişiklikler**:
  - Vehicle model'e 2 yeni field eklendi:
    - `previous_status: str | None` - önceki statusu tutmak
    - `status_changed_at: datetime | None` - değişim zamanı
  - `to_dict()` ve `from_dict()` metodları güncellendi

#### 3. Data Manager Güncellemesi
- **Dosya**: `managers/data_manager.py`
- **Değişiklikler**:
  1. `update_vehicle()` metodunda status değişim takibi:
     ```python
     if "availability_status" in updated_data:
         new_status = updated_data["availability_status"]
         old_status = vehicle.availability_status
         if new_status != old_status:
             updated_data["previous_status"] = old_status
             updated_data["status_changed_at"] = datetime.utcnow()
     ```
  
  2. Yeni method eklendi: `get_recently_status_changed_to_available(limit=10)`
     - Status'u "Available" olan
     - Önceki statusu "Available"dan farklı
     - Son 10 araç sırasıyla
     - Status değişim zamanına göre en yeniden eski'ye

### 🌐 Web Uygulaması (Supabase)

#### 1. Fonksiyon Güncellemesi
- **Dosya**: `src/app/page.tsx`
- **Fonksiyon**: `fetchRecentlyAvailable()`
- **Eski Davranış**:
  ```typescript
  .or("availability_status.eq.Available,...")
  .order("id", { ascending: false })
  .limit(10)
  ```
- **Yeni Davranış**:
  ```typescript
  .eq("availability_status", "Available")
  .neq("previous_status", "Available")  // Status DEĞİŞMİŞ
  .not("previous_status", "is", null)
  .order("status_changed_at", { ascending: false })
  .limit(10)
  ```

#### 2. Supabase Schema Güncellemesi (YAPILMASI GEREKLI)
- **Dosya**: `supabase_migration_status_tracking.sql`
- **Adımlar**:
  1. Supabase Dashboard → SQL Editor aç
  2. Dosyadaki SQL'i yapıştır
  3. Çalıştır

---

## 🚀 Kurulum Talimatları

### Adım 1: Desktop Uygulaması (SQLite)
```bash
cd d:\AIprojects\diecast-police-manager\diecast-police-manager

# Migration'ı çalıştır (ZATEN YAPILDI)
python migrate_status_tracking.py ./data/collection.db

# Verification
python migrate_status_tracking.py ./data/collection.db --verify-only
```

**Bitti!** Desktop uygulaması otomatik olarak status değişimlerini kaydedecek.

### Adım 2: Web Uygulaması (Supabase)

#### Option A: Supabase Dashboard (Kolay)
1. https://app.supabase.com/projects/yzvsfzkksmvwaseudkrq/sql/new aç
2. `supabase_migration_status_tracking.sql` dosyasındaki SQL'i kopyala
3. Yapıştır ve "Run" tuşuna bas ✅

#### Option B: Supabase CLI
```bash
cd d:\AIprojects\diecast-police-manager-webpush

# Migration dosyası oluştur
supabase migration new add_status_tracking

# Dosyaya SQL'i yapıştır (migration klasöründe)
# Sonra push et
supabase db push
```

---

## 🔍 Veri Akışı

```
Senaryo: "Ordered" durumundaki araç "Available"a değiştirildi
│
├─ Desktop Uygulaması
│  └─ Vehicle Form: Status "Ordered" → "Available" olarak değiştirilir
│     └─ data_manager.update_vehicle() çağrılır
│        ├─ previous_status = "Ordered" olarak kaydedilir
│        ├─ status_changed_at = now() olarak kaydedilir
│        └─ Log: "Vehicle 123 status change: Ordered → Available"
│
├─ Veritabanı (SQLite)
│  └─ vehicles tablosunda:
│     ├─ id: 123
│     ├─ availability_status: "Available"
│     ├─ previous_status: "Ordered"
│     ├─ status_changed_at: 2026-04-30 15:30:45
│     └─ updated_at: 2026-04-30 15:30:45
│
├─ Sync/Export (Supabase'e)
│  └─ SQLite → Supabase (vehicles tablosu)
│     └─ Tüm alanlar dahil
│
└─ Web Uygulaması
   ├─ fetchRecentlyAvailable() çağrılır
   └─ Supabase sorgusu:
      ├─ WHERE availability_status = "Available"
      ├─ AND previous_status != "Available"
      ├─ AND previous_status IS NOT NULL
      └─ ORDER BY status_changed_at DESC
         └─ Son 10 araç gösterilir
```

---

## 📊 Örnek Veri

**Desktop SQLite'da:**
```
ID | model_name              | availability_status | previous_status | status_changed_at
---|---|---|---|---
1  | Mercedes GLE (Police)   | Available           | Ordered         | 2026-04-30 15:30
2  | BMW 3 Series (Ambulance)| Available           | Not Available   | 2026-04-30 15:20
3  | Audi A6 (Firefighter)  | Available           | To Process      | 2026-04-30 15:10
```

**Web'de gösterilen "Recently Available":**
1. Mercedes GLE (Police) - Ordered → Available - 15:30
2. BMW 3 Series (Ambulance) - Not Available → Available - 15:20
3. Audi A6 (Firefighter) - To Process → Available - 15:10

---

## ✨ Özellikleri

✅ **Status Değişim Takibi**: Hangi statustan geldiği kaydediliyor
✅ **Zaman Takibi**: Ne zaman değiştiği kaydediliyor
✅ **En Son 10**: Son değiştirilmiş 10 araç gösterilir
✅ **Sadece Değişenler**: Yeni eklenen değil, durumu değişen araçlar
✅ **Cross-Platform**: Desktop ↔ Web senkronizasyonu
✅ **Index**: Veritabanında hızlı sorgulama için index'ler oluşturuldu

---

## 🧪 Test Etme

### Desktop'ta Test
```python
from managers.data_manager import DataManager

dm = DataManager()

# Bir araç statusunu değiştir
dm.update_vehicle(1, {"availability_status": "Available"})

# Recently changed to available araçları göster
recent = dm.get_recently_status_changed_to_available(limit=10)
for v in recent:
    print(f"{v['model_name']}: {v['previous_status']} → Available")
```

### Web'de Test
1. Desktop'ta bir araç statusunu "Available"a değiştir
2. Veritabanı sync et / Backup yap
3. Web sayfasını aç
4. "Recently Available" bölümünü kontrol et
5. Yeni araç görülmeli ✅

---

## 📝 Notlar

- **Backward Compatibility**: Tüm mevcut kayıtlar initialize edildi (previous_status = current status)
- **First Time**: İlk kez status değiştirildiğinde, önceki ve yeni status kaydedilir
- **Limit**: Son 10 araç gösterilir (fonksiyonda değiştirilebilir)
- **Timezone**: UTC zamanı kullanılmaktadır
- **Performance**: İndexler oluşturuldu, sorgu performansı optimized

---

## 🔧 Sorun Giderme

### "Recently Available" boş gösteriliyor
```
Sebepleri:
1. Supabase migration çalıştırılmadı
2. Status değişimi yapılmadı
3. Veritabanı sync'lenmedi

Çözüm:
- Supabase SQL Editor'de verification query çalıştır:
  SELECT * FROM vehicles 
  WHERE availability_status = 'Available' 
    AND previous_status != 'Available'
  ORDER BY status_changed_at DESC;
```

### Migration hatası
```
Sebepleri:
- Veritabanı kilidi
- Yanlış veritabanı yolu

Çözüm:
- Uygulamayı kapatıp tekrar aç
- Doğru veritabanı yolunu kontrol et
```

---

## 📚 İlgili Dosyalar

| Dosya | Açıklama | Durum |
|-------|----------|-------|
| `core/models.py` | Vehicle model definition | ✅ Güncellendi |
| `managers/data_manager.py` | CRUD ve query işlemleri | ✅ Güncellendi |
| `migrate_status_tracking.py` | SQLite migration | ✅ Çalıştırıldı |
| `src/app/page.tsx` | Web uygulaması | ✅ Güncellendi |
| `supabase_migration_status_tracking.sql` | Supabase migration | 🔧 Çalıştırılacak |

---

## 🎯 Sonuç

✅ **Desktop tarafı**: Tam olarak çalışıyor, status değişimleri kaydediliyor
⏳ **Web tarafı**: Supabase migration'ı yapıldıktan sonra çalışacak

Supabase migration'ı çalıştırdıktan sonra, "Recently Available" bölümü artık **yeni eklenen araçlar** yerine **durumu değişen araçları** gösterecektir! 🎉
