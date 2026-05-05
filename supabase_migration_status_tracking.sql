-- Supabase Migration: Add status tracking fields to vehicles table
-- This script adds the following columns to track status changes:
-- - previous_status: varchar - stores the previous availability status
-- - status_changed_at: timestamp - tracks when the status was last changed

-- Add columns if they don't exist
ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS previous_status VARCHAR(50);

ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS status_changed_at TIMESTAMP;

-- Initialize status_changed_at for existing records
-- Set it to updated_at if status_changed_at is NULL
UPDATE vehicles 
SET status_changed_at = updated_at 
WHERE status_changed_at IS NULL;

-- Initialize previous_status to current availability_status for existing records
UPDATE vehicles 
SET previous_status = availability_status 
WHERE previous_status IS NULL;

-- Create an index on status_changed_at for efficient sorting
CREATE INDEX IF NOT EXISTS idx_status_changed_at ON vehicles (status_changed_at DESC);

-- Create a compound index for the "recently changed to available" query
CREATE INDEX IF NOT EXISTS idx_recently_available 
ON vehicles (availability_status, previous_status, status_changed_at DESC);

-- Verify the changes
-- Run these queries to verify:
-- SELECT COUNT(*) FROM vehicles WHERE status_changed_at IS NOT NULL;
-- SELECT COUNT(*) FROM vehicles WHERE previous_status IS NOT NULL;
-- SELECT id, model_name, availability_status, previous_status, status_changed_at 
--   FROM vehicles 
--   WHERE availability_status = 'Available' AND previous_status != 'Available' AND previous_status IS NOT NULL
--   ORDER BY status_changed_at DESC 
--   LIMIT 10;
