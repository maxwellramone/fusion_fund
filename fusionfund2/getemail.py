import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

sender_email = 'fusionfundtestemail@gmail.com'
sender_password = 'yedf ttry sxpm gzfk'
recipient_email = 'mzhou2222@gmail.com'
subject = 'hello'
message = 'Hello'

msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = recipient_email
msg['Subject'] = subject

html_content = """
<html>
  
</html>
"""

msg.attach(MIMEText(html_content, 'html'))

smtp_server = 'smtp.gmail.com'
smtp_port = 587

with smtplib.SMTP(smtp_server, smtp_port) as server:
    server.starttls() 

    server.login(sender_email, sender_password)

    server.sendmail(sender_email, recipient_email, msg.as_string())

print('Test')




# Collect Top 3 summaries

