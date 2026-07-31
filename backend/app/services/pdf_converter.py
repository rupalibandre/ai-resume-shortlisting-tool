from pathlib import Path
from docx2pdf import convert


def convert_docx_to_pdf(file_path: str):

    docx_path = Path(file_path)

    if docx_path.suffix.lower() != ".docx":
        return str(docx_path)

    pdf_path = docx_path.with_suffix(".pdf")

    try:

        convert(
            str(docx_path.resolve()),
            str(pdf_path.resolve()),
        )

    except Exception as e:

        raise Exception(
            f"DOCX to PDF conversion failed: {e}"
        )

    if not pdf_path.exists():

        raise Exception(
            f"PDF was not created: {pdf_path}"
        )

    return str(pdf_path)