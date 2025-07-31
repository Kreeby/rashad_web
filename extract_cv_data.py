import PyPDF2
import re

def extract_cv_data():
    try:
        with open('cv.pdf', 'rb') as file:
            pdf_reader = PyPDF2.PdfReader(file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
        
        print("=== EXTRACTED CV DATA ===")
        print(text)
        print("=== END OF CV DATA ===")
        
        return text
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None

if __name__ == "__main__":
    extract_cv_data() 