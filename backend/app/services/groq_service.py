import json

from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def test_groq():
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": "Reply with only one word: Connected",
            }
        ],
    )

    return response.choices[0].message.content


def ai_resume_match(resume_text: str, job_description: str):

    prompt = f"""
You are an AI Resume Screening System.

Compare the following Resume and Job Description.

Resume:
{resume_text}

Job Description:
{job_description}

Return ONLY valid JSON in this format:

{{
    "match_percentage": number,
    "matched_skills": [],
    "missing_skills": [],
    "strengths": [],
    "weaknesses": [],
    "recommendation": ""
}}

Do not return markdown.
Do not return explanation.
Only JSON.
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        temperature=0.2,
    )

    return json.loads(
        response.choices[0].message.content
    )