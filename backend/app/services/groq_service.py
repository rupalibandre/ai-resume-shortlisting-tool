import os
import json
import re

from groq import Groq


# =========================================================
# GROQ CLIENT
# =========================================================

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured")


client = Groq(
    api_key=GROQ_API_KEY
)


# =========================================================
# AI RESUME MATCH
# =========================================================

def ai_resume_match(resume_text: str, job_description: str):

    prompt = f"""
You are an AI Resume Shortlisting and Recruitment Assistant.

Analyze the candidate resume against the given job description.

Return ONLY valid JSON.

Required JSON format:

{{
    "candidate_name": "",
    "match_percentage": 0,
    "summary": "",
    "strengths": [],
    "weaknesses": [],
    "missing_skills": [],
    "interview_questions": []
}}

Rules:

1. match_percentage must be a number between 0 and 100.
2. candidate_name should be extracted from the resume if possible.
3. strengths must be an array of strings.
4. weaknesses must be an array of strings.
5. missing_skills must be an array of strings.
6. interview_questions must contain useful interview questions.
7. Do not add markdown.
8. Do not add ```json.
9. Return JSON only.

JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}
"""

    try:

        response = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert ATS resume screening "
                        "assistant. Always return valid JSON."
                    ),
                },
                {
                    "role": "user",
                    "content": prompt,
                },
            ],
            temperature=0.2,
            max_completion_tokens=2000,
        )

        content = response.choices[0].message.content

        if not content:
            raise RuntimeError(
                "Groq returned an empty response"
            )

        content = content.strip()

        # Remove markdown JSON wrapper if model adds it
        content = re.sub(
            r"^```json\s*",
            "",
            content,
            flags=re.IGNORECASE,
        )

        content = re.sub(
            r"\s*```$",
            "",
            content,
        )

        content = content.strip()

        # Parse JSON
        result = json.loads(content)

        # -------------------------------------------------
        # Safe defaults
        # -------------------------------------------------

        result.setdefault(
            "candidate_name",
            "",
        )

        result.setdefault(
            "match_percentage",
            0,
        )

        result.setdefault(
            "summary",
            "",
        )

        result.setdefault(
            "strengths",
            [],
        )

        result.setdefault(
            "weaknesses",
            [],
        )

        result.setdefault(
            "missing_skills",
            [],
        )

        result.setdefault(
            "interview_questions",
            [],
        )

        # -------------------------------------------------
        # Validate score
        # -------------------------------------------------

        try:

            score = float(
                result["match_percentage"]
            )

        except:

            score = 0

        score = max(
            0,
            min(
                100,
                score,
            ),
        )

        result["match_percentage"] = score

        return result

    except json.JSONDecodeError as error:

        print(
            "Groq JSON parsing error:",
            error,
        )

        print(
            "Groq raw response:",
            content if "content" in locals() else "EMPTY",
        )

        return {
            "candidate_name": "",
            "match_percentage": 0,
            "summary": "AI response could not be parsed.",
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "interview_questions": [],
        }

    except Exception as error:

        print(
            "Groq AI Error:",
            repr(error),
        )

        raise RuntimeError(
            f"AI Resume Matching Failed: {str(error)}"
        )