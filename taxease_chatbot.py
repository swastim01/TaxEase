from langchain_community.llms import LlamaCpp  # Correct import
from fastapi import FastAPI

app = FastAPI()

# Load your local model
llm = LlamaCpp(
    model_path="models/OpenHermes-2.5-Mistral-7B/openhermes-2.5-mistral-7b.Q4_K_M.gguf",  # Corrected syntax
    temperature=0.7,
    max_tokens=256,
    n_ctx=2048
)

@app.get("/ask")
def ask(question: str):
    response = llm.invoke(question)  # Use `.invoke()` for correct execution
    return {"question": question, "answer": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
