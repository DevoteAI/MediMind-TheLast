-- Add missing columns to personal_patients table
ALTER TABLE personal_patients
ADD COLUMN IF NOT EXISTS assigned_department text,
ADD COLUMN IF NOT EXISTS assigned_doctor_id uuid REFERENCES users(id);

-- Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_personal_patients_assigned_department 
ON personal_patients(assigned_department);

CREATE INDEX IF NOT EXISTS idx_personal_patients_assigned_doctor 
ON personal_patients(assigned_doctor_id);

-- Update copy function to include new fields
CREATE OR REPLACE FUNCTION copy_assigned_patients_to_personal()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Copy patients where user is the assigned doctor
  INSERT INTO personal_patients (
    user_id,
    name,
    diagnosis,
    room_number,
    status,
    admission_date,
    echo_data,
    ecg_data,
    age,
    sex,
    comorbidities,
    assigned_department,
    assigned_doctor_id,
    last_modified_by,
    last_modified_at
  )
  SELECT 
    p.assigned_doctor_id as user_id,
    p.name,
    p.diagnosis,
    p.room_number,
    p.status,
    p.admission_date,
    p.echo_data,
    p.ecg_data,
    p.age,
    p.sex,
    p.comorbidities,
    p.assigned_department,
    p.assigned_doctor_id,
    p.last_modified_by,
    p.last_modified_at
  FROM patients p
  WHERE 
    p.assigned_doctor_id IS NOT NULL
    AND NOT EXISTS (
      SELECT 1 
      FROM personal_patients pp 
      WHERE 
        pp.user_id = p.assigned_doctor_id
        AND pp.name = p.name
        AND pp.diagnosis = p.diagnosis
    );
END;
$$;