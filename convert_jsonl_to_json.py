import json

# Input and output file names
jsonl_file = "taxease_finetune_final.jsonl"
json_file = "tax_data.json"

json_data = []

# Read JSONL file and convert format
with open(jsonl_file, "r", encoding="utf-8") as file:
    for line in file:
        data = json.loads(line)
        
        # Ensure correct key names
        if "prompt" in data and "completion" in data:
            json_data.append({
                "question": data["prompt"].strip(),
                "answer": data["completion"].strip()
            })
        else:
            print("Skipping invalid entry:", data)

# Save as JSON
with open(json_file, "w", encoding="utf-8") as file:
    json.dump(json_data, file, indent=4)

print(f"✅ Converted {jsonl_file} to {json_file}")
