REQUIRED_SKILLS = [
    "Python",
    "React",
    "FastAPI",
    "SQL",
    "Git",
    "Docker",
    "AWS",
]


def calculate_score(found_skills):

    matched = []
    missing = []

    for skill in REQUIRED_SKILLS:

        if skill in found_skills:
            matched.append(skill)
        else:
            missing.append(skill)

    score = int(
        (len(matched) / len(REQUIRED_SKILLS)) * 100
    )

    return {
        "score": score,
        "matched_skills": matched,
        "missing_skills": missing,
    }