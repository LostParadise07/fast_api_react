import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

def get_tags_from_gemini_pro(article_content: str):
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

    # Create the model
    generation_config = {
      "temperature": 1,
      "top_p": 0.95,
      "top_k": 40,
      "max_output_tokens": 8192,
      "response_mime_type": "text/plain",
    }

    model = genai.GenerativeModel(
      model_name="gemini-1.5-flash",
      generation_config=generation_config,
      system_instruction="You will receive Wikipedia articles, and you need to tag them with a single word that best suits the category.",
    )

    chat_session = model.start_chat(
      history=[
        {
          "role": "user",
          "parts": [
            "python \n",
          ],
        },
        {
          "role": "model",
          "parts": [
            "Please provide me with the Wikipedia article text for \"python\".  I need the text of the article to be able to categorize it.  I can then categorize it based on things like:\n\n* **Programming Language:** This is the most obvious category given the query.\n* **Software:** A broader category encompassing programming languages.\n* **Computer Science:**  A field of study to which Python belongs.\n* **Specific Python versions (if applicable):**  The article might discuss specific versions like Python 3.11.\n* **Related technologies:**  The article may mention related libraries, frameworks, or applications.\n\n\nGive me the text, and I'll do my best to categorize it.\n",
          ],
        },
        {
          "role": "user",
          "parts": [
            "python",
          ],
        },
        {
          "role": "model",
          "parts": [
            "Programming Language\n",
          ],
        },
        {
          "role": "user",
          "parts": [
            "python",
          ],
        },
        {
          "role": "model",
          "parts": [
            "Programming\n",
          ],
        },
      ]
    )
    # return
    response = chat_session.send_message(article_content)
    return response.text


