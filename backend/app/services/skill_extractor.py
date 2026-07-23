SKILLS = [
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Angular",
    "Vue",
    "Node.js",
    "Express",
    "FastAPI",
    "Django",
    "Flask",
    "HTML",
    "CSS",
    "Tailwind",
    "Bootstrap",
    "SQL",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Firebase",
]


def extract_skills(text: str):

    found_skills = []

    lower_text = text.lower()

    for skill in SKILLS:

        if skill.lower() in lower_text:
            found_skills.append(skill)

    return sorted(list(set(found_skills)))