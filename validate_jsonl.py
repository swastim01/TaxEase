import json

input_file = "taxease_finetune.jsonl"  # Update if needed
output_file = "taxease_finetune_fixed.jsonl"  # Output file with corrections

def validate_and_fix_jsonl(input_file, output_file):
    fixed_lines = []
    
    with open(input_file, "r", encoding="utf-8") as f:
        for line_num, line in enumerate(f, start=1):
            try:
                obj = json.loads(line)  # Try loading each JSON line
                fixed_lines.append(json.dumps(obj, ensure_ascii=False))  # Normalize format
            except json.JSONDecodeError as e:
                print(f"❌ Error on line {line_num}: {e}")
                print(f"🔧 Attempting to fix line {line_num}...")

                # Try basic fixes (like removing trailing commas)
                fixed_line = line.strip().rstrip(",")  # Remove trailing commas
                try:
                    obj = json.loads(fixed_line)
                    fixed_lines.append(json.dumps(obj, ensure_ascii=False))
                    print(f"✅ Fixed line {line_num}")
                except json.JSONDecodeError:
                    print(f"❌ Unable to auto-fix line {line_num}. Please check manually.")

    # Save fixed file
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(fixed_lines) + "\n")

    print(f"\n✅ Fixed file saved as: {output_file}")

validate_and_fix_jsonl(input_file, output_file)
