from fastapi import FastAPI
from dotenv import load_dotenv
from langserve import add_routes

from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate

app = FastAPI()
load_dotenv()


# model = ChatOpenAI()
# prompt = ChatPromptTemplate.from_template(
#     "Give me a summary about {topic} in a paragraph or less."
# )

# chain = prompt | model
# add_routes(app, chain, path="/openai")

@app.get("/email/sanitize")
async def root():
    return {"message": "Hello World"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
