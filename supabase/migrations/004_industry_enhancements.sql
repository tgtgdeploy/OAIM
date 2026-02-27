-- 004: Industry-specific enhancements for F&B, Beauty, and shared features

-- Staff table enhancements (Beauty industry)
ALTER TABLE staff ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE staff ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE staff ADD COLUMN IF NOT EXISTS email TEXT;

-- Appointments table enhancements (Beauty industry)
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS service_id UUID REFERENCES products(id);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS therapist_id UUID REFERENCES staff(id);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS price NUMERIC(12,2);
ALTER TABLE appointments ADD COLUMN IF NOT EXISTS notes TEXT;

-- Reservations table enhancements (F&B industry)
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS contact_id UUID REFERENCES contacts(id);
ALTER TABLE reservations ADD COLUMN IF NOT EXISTS phone TEXT;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_appointments_contact_id ON appointments(contact_id);
CREATE INDEX IF NOT EXISTS idx_appointments_service_id ON appointments(service_id);
CREATE INDEX IF NOT EXISTS idx_appointments_therapist_id ON appointments(therapist_id);
CREATE INDEX IF NOT EXISTS idx_reservations_contact_id ON reservations(contact_id);
