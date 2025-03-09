import json

input_file = "taxease_finetune_fixed.jsonl"
output_file = "taxease_finetune_final.jsonl"

fixed_lines = []

# Read the incorrect format JSONL file
with open(input_file, "r") as f:
    for line in f:
        data = json.loads(line.strip())  # Load each JSON object
        messages = data.get("messages", [])  # Extract messages array

        # Ensure the structure is correct
        user_msg = next((m["content"] for m in messages if m["role"] == "user"), None)
        assistant_msg = next((m["content"] for m in messages if m["role"] == "assistant"), None)

        if user_msg and assistant_msg:
            # Convert into OpenAI fine-tuning format
            fixed_lines.append(json.dumps({"prompt": user_msg, "completion": assistant_msg}))

# Write the corrected JSONL file
with open(output_file, "w") as f:
    f.write("\n".join(fixed_lines) + "\n")

print(f"✅ Fixed JSONL file saved as {output_file}")
