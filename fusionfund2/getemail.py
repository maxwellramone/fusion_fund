import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from nltk.stem import PorterStemmer



def sendMessage():
    from main import websites

    keys = list(websites[0].keys())

    html_content = ""
    for key in keys:
        
        summaries_ranked = get_ranks(key)
        if summaries_ranked:
            html_content += f"""
            <html>
                <body>
                    <h2>{key}:</h2>
            """

            # Add each summary to the html_content
            for summary in summaries_ranked[:3]:
                html_content += f"<p>{summary}</p>"

            html_content += """
                </body>
            </html>
            """

    sender_email = 'fusionfundtestemail@gmail.com'
    sender_password = 'yedf ttry sxpm gzfk'
    recipient_email = 'maxwellramone3@gmail.com'
    subject = 'Weekly Update on AI Technologies'
    # message = 'Hello'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject


    msg.attach(MIMEText(html_content, 'html'))

    smtp_server = 'smtp.gmail.com'
    smtp_port = 587

    with smtplib.SMTP(smtp_server, smtp_port) as server:
        server.starttls() 

        server.login(sender_email, sender_password)

        server.sendmail(sender_email, recipient_email, msg.as_string())

    print('Email Sent')









# Collect Top 3 summaries

def get_ranks(model):
    from excel import summaries_sorted, read_summary_column

    file_names = summaries_sorted(model)
    if file_names is not None:
        file_name = str(file_names[0])
        # Example usage with input from a text file:
        # file_path = '/input.txt'  # Replace with the path to your text file IN A STRING
        sample_sentences = read_summary_column(file_name)
        # print(sample_sentences)
        if sample_sentences:
            try:
                target_words = ["breakthrough", "research", "findings", "aquisition",
                                "trends", "emerging", "innovation", "awards"
                                "new", "recent", "talent", "government", "medical",
                                "education", "trends", "launches", "findings"]  # List of words for similarity comparison

                ranked_result = rank_sentences(sample_sentences, target_words)
                return ranked_result
                
            except Exception as e:
                print(e)
        else:
            return []
    
    



def calculate_jaccard_similarity(set1, set2):
    intersection = len(set1.intersection(set2))
    union = len(set1.union(set2))
    return intersection / union if union != 0 else 0

def preprocess_sentence(sentence):
    stemmer = PorterStemmer()
    words = sentence.split()  # Split sentence into words
    stemmed_words = [stemmer.stem(word) for word in words]
    return set(stemmed_words)


def rank_sentences(sentences, target_words):
    try:
        target_word_set = set(target_words)

        # Preprocess sentences and calculate Jaccard scores
        processed_sentences = [preprocess_sentence(sentence) for sentence in sentences]
        scores = []

        for i in range(len(processed_sentences)):
            jaccard_score = calculate_jaccard_similarity(
                processed_sentences[i], target_word_set
            )
            scores.append((i, jaccard_score))

        # Rank sentences based on Jaccard scores
        ranked_sentences = sorted(scores, key=lambda x: x[1], reverse=True)
        ranked_order = [item[0] for item in ranked_sentences]

        return [sentences[i] for i in ranked_order]
    except Exception as e:
        print(f"Error during sentence ranking: {e}")
        return []

