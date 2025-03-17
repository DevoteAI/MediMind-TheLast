-- Add patient_id column to abg_results table
ALTER TABLE abg_results
ADD COLUMN patient_id uuid REFERENCES patients(id) ON DELETE SET NULL;

-- Create index for patient_id
CREATE INDEX idx_abg_results_patient_id ON abg_results(patient_id);

-- Update RLS policy to include patient_id in the check
DROP POLICY IF EXISTS "Users can manage their ABG results" ON abg_results;
CREATE POLICY "Users can manage their ABG results"
ON abg_results
FOR ALL TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid()); 