import smtplib

from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

from app.core.config import (
    EMAIL_HOST,
    EMAIL_PORT,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,
    EMAIL_FROM,
)


def send_email(
    to_email: str,
    subject: str,
    body: str,
):

    try:

        message = MIMEMultipart()

        message["From"] = EMAIL_FROM
        message["To"] = to_email
        message["Subject"] = subject

        message.attach(
            MIMEText(
                body,
                "plain",
            )
        )

        server = smtplib.SMTP(
            EMAIL_HOST,
            EMAIL_PORT,
        )

        server.starttls()

        server.login(
            EMAIL_USERNAME,
            EMAIL_PASSWORD,
        )

        server.sendmail(
            EMAIL_FROM,
            to_email,
            message.as_string(),
        )

        server.quit()

        return True

    except Exception as e:

        print("EMAIL ERROR:", e)

        return False


def send_shortlisted_email(
    candidate_name: str,
    candidate_email: str,
    company: str,
):

    subject = "Congratulations! You have been shortlisted."

    body = f"""
Hello {candidate_name},

Congratulations!

You have been shortlisted by {company}.

Our HR team will contact you soon.

Best Regards,
AI Resume Shortlisting System
"""

    return send_email(
        candidate_email,
        subject,
        body,
    )


def send_rejected_email(
    candidate_name: str,
    candidate_email: str,
    company: str,
):

    subject = "Application Update"

    body = f"""
Hello {candidate_name},

Thank you for applying at {company}.

After careful evaluation, we are unable to move forward with your application.

We wish you success in your future opportunities.

Best Regards,
AI Resume Shortlisting System
"""

    return send_email(
        candidate_email,
        subject,
        body,
    )


def send_interview_email(
    candidate_name: str,
    candidate_email: str,
    company: str,
    interview_date,
    interview_time,
    interviewer,
    mode,
):

    subject = "Interview Invitation"

    body = f"""
Hello {candidate_name},

Congratulations!

Your interview has been scheduled.

Company : {company}

Date : {interview_date}

Time : {interview_time}

Mode : {mode}

Interviewer : {interviewer}

Please join on time.

Best Regards,
AI Resume Shortlisting System
"""

    return send_email(
        candidate_email,
        subject,
        body,
    )