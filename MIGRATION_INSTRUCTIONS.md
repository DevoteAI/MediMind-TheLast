# Migration Instructions

## Adding `patient_id` to ABG Results Table

There is an issue with saving ABG analysis results with patient information. The `patient_id` column is missing from the `abg_results` table in the database.

### Temporary Fix

A temporary fix has been implemented in the `useABGStore.ts` file. This fix allows saving ABG results without patient information until the migration is applied.

### Applying the Migration

To permanently fix this issue, you need to apply the migration to add the `patient_id` column to the `abg_results` table:

1. Make sure you have the Supabase CLI installed:
   ```bash
   npm install -g supabase
   ```

2. Log in to your Supabase account:
   ```bash
   supabase login
   ```

3. Link your project (if not already linked):
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```
   Replace `YOUR_PROJECT_REF` with your Supabase project reference.

4. Apply the migration:
   ```bash
   supabase db push
   ```

5. Alternatively, you can manually apply the SQL migration in the Supabase dashboard:
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and paste the contents of the migration file: `supabase/migrations/20250301000000_add_patient_id_to_abg_results.sql`
   - Run the SQL query

### Migration SQL

```sql
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
```

After applying this migration, you should be able to save ABG results with patient information. 