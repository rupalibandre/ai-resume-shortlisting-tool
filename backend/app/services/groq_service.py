import json
import re

from groq import Groq

from app.core.config import GROQ_API_KEY

client = Groq(api_key=GROQ_API_KEY)


def ai_resume_match(
    resume_text: str,
    job_description: str,
):

    prompt = f"""
You are an Expert ATS AI.

Compare the Resume with the Job Description.

Return ONLY valid JSON.

Resume:
{resume_text}

Job Description:
{job_description}

JSON Format:

{{
    "match_percentage": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "interview_questions": []
}}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        temperature=0.2,
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
    )

    content = response.choices[0].message.content.strip()

    print("\n================ GROQ RESPONSE ================\n")
    print(content)
    print("\n===============================================\n")

    try:

        start = content.find("{")
        end = content.rfind("}") + 1

        if start != -1 and end != -1:

            content = content[start:end]

        data = json.loads(content)

        data.setdefault("match_percentage", 0)
        data.setdefault("summary", "")
        data.setdefault("strengths", [])
        data.setdefault("weaknesses", [])
        data.setdefault("missing_skills", [])
        data.setdefault("interview_questions", [])

        return data

    except Exception as e:

        print("JSON ERROR :", e)

        percentage = re.findall(r"\d+", content)

        score = 0

        if percentage:

            try:
                score = int(percentage[0])
            except:
                score = 0

        return {
            "match_percentage": score,
            "summary": content,
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "interview_questions": [],
        }