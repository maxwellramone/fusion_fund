import pandas



# Example Dictionary:
# {
    #   "Model" : "OpenAi",
    #   "Date": "01/01/01",
    #   "Collected text": " ",
    #   "summary_bart": "",
    #   "summary_textrazor": ""
    # }
# summary = {"Model" : "model", 
#     "Date" : "date", 
#     "Collected_Text" : "text_to_summarize", 
#     "Summary_Bart" : "summaryBart", 
#     "Summary_TextRazor" : "summaryRazor"}

# weeklySummary = [summary, summary]



def toExcel(summary, model):
    import datetime

    # Create a pandas DataFrame
    df = pandas.DataFrame(summary)

    #Get today's date
    date = datetime.date.today().strftime('%d-%m-%Y')

    # Get the current time
    current_time = datetime.datetime.now().time()

    # Format the current time as a string
    time = current_time.strftime("%H-%M-%S")

    # Creates file name
    summary_name = f"SummarySheets\Summary_{date}_{time}.xlsx"

    # Create an Excel writer object
    excel_writer = pandas.ExcelWriter(summary_name, engine = "openpyxl")

    # Write the DataFrame to the Excel file
    df.to_excel(excel_writer, sheet_name=f"Summary{date}", index=False)

    # Save the Excel file
    excel_writer.close()

    print("Excel file created successfully.")
    logSave(summary_name, model, date)
    




    
def logSave(summary_name, model, date):
    import pandas
    # Step 1: Read Excel file as a DataFrame
    excel_file = 'SummarySheets\SummaryLogs.xlsx'  # Replace with the path to your Excel file
    df = pandas.read_excel(excel_file)

    # Step 2: Increment the serial number column by one
    df['SerialNumber'] = df['SerialNumber'] + 1

    # Step 3: Add an entry to the DataFrame
    new_entry = {'SerialNumber': max(df['SerialNumber']) + 1, 'File Name': summary_name, 'date': date, 'model' : model}
    new_entry_df = pandas.DataFrame(new_entry, index=[0])
    df = pandas.concat([df, new_entry_df], ignore_index=True)

    # Step 4: Update the Excel file with the updated DataFrame
    with pandas.ExcelWriter(excel_file, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
        df.to_excel(writer, sheet_name='Sheet1', index=False)

    print("Updated Excel file successfully.")





    





def filter_excel_data(model, date):
    file_path = "SummarySheets\SummaryLogs.xlsx"
    # try:

    #     # Read the Excel file into a DataFrame
    #     df = pandas.read_excel(file_path, engine='openpyxl')

    #     # Filter the DataFrame to match the provided model and date
    #     filtered_data = df[(df['model'] == model) & (df['date'] == date)]

    #     # Extract the 'Summary' column values from the filtered data
    #     summary_names = filtered_data['Summary_Bart'].toList()
    #     print(summary_names)
    #     return summary_names

    # except Exception as e:
    #     print("Error")

    import openpyxl
    try:
        # Open the Excel file
        workbook = openpyxl.load_workbook(file_path)
        sheet = workbook.active

        matching_cells = []

        for row in sheet.iter_rows(min_row=2):  # Assuming data starts from row 2
            row_model = row[3].value  # Assuming mode is in the first column
            row_date = row[2].value  # Assuming date is in the second column
            print(row_model == model and row_date == date)
            if row_model == model and row_date == date:
                print(row[1].value)
                # If mode and date match, add the entire row to the result list
                matching_cells.append(row[1].value)

        workbook.close()
        return matching_cells

    except Exception as e:
        return str(e)







    


def extract_summary_bart_cells(data_list):
        import os

        directory = "SummarySheets"

        summary_list = []

        # Iterate through the directory
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.endswith(".xlsx"):
                    file_path = os.path.join(root, file)

                    # Open the Excel file using pandas
                    try:
                        df = pandas.read_excel(file_path, engine='openpyxl')
                        
                        path = f"SummarySheets\{file}"
                        if path in data_list:
                            print("Check")
                            # Extract the 'Summary_Bart' column and append it to the summary list
                            if 'Summary_Bart' in df.columns:
                                summary_data = df['Summary_Bart'].tolist()
                                summary_list.extend(summary_data)

                    except Exception as e:
                        print(f"Error processing file {file}: {str(e)}")

        return summary_list




def createLog():
    data = {
    "SerialNumber": [0],
    "File Name": [""],
    "date": [""],
    "model": [""]
    }

    df = pandas.DataFrame(data)

    # Specify the output file name
    output_file = "SummarySheets\SummaryLogs.xlsx"

    # Write the DataFrame to an XLSX file
    df.to_excel(output_file, index=False)

    print(f"DataFrame has been saved to {output_file}")



def summaries_ranked(model):
    file_path = 'fusionfund2\SummarySheets\SummaryLogs.xlsx'

    try:
        # Open the Excel file
        excel_file = pandas.ExcelFile(file_path)  # Use the variable 'file_path' for consistency

        # Read the data from the Excel file
        df = excel_file.parse(excel_file.sheet_names[0])  # Assuming data is in the first sheet

        # Filter rows based on the specified model
        model_rows = df[df['model'] == model]
        model_rows.sort_values(by='SerialNumber', ascending=False)  # Sort in-place

        # Create a list of values from the 'File Name' column
        result_list = model_rows['File Name'].tolist()

        # Take only the first three values if there are more than three
        result_list = result_list[-3:]

        return result_list

    except Exception as e:
        return [str(e)]  # Return the error message as a list










def list_to_json(input_list):
    import json
    
    try:
        # Use json.dumps to convert the list to a JSON string
        json_string = json.dumps(input_list)
        return json_string
    except Exception as e:
        return str(e)







# # Example usage:
# file_path = 'your_excel_file.xlsx'  # Replace with the path to your Excel file
# model = 'ModelXYZ'  # Replace with the desired model
# date = '2023-11-07'  # Replace with the desired date

# result = filter_excel_data(file_path, model, date)
# if isinstance(result, list):
#     for summary in result:
#         print(summary)
# else:
#     print("An error occurred:", result)


# def get_cell_value_from_xlsx(file_path, sheet_name, cell_address):
#     """
#     Reads an XLSX file, extracts the value from the specified cell, and returns it.

#     :param file_path: The path to the XLSX file.
#     :param sheet_name: The name of the sheet in the XLSX file.
#     :param cell_address: The cell address (e.g., 'A1', 'B2', 'C3').
#     :return: The value from the specified cell.
#     """
#     try:
#         # Read the XLSX file into a DataFrame
#         df = pandas.read_excel(file_path, sheet_name=sheet_name)
        
#         # Get the value from the specified cell
#         cell_value = df.at[cell_address[0], cell_address[1]]
        
#         return cell_value
#     except Exception as e:
#         return f"Error: {str(e)}"

# # Example usage:
# file_path = "your_file.xlsx"  # Replace with the path to your XLSX file
# sheet_name = "Sheet1"  # Replace with the name of the sheet you want to read
# cell_address = ('A', 1)  # Replace with the cell address you want to retrieve

# cell_value = get_cell_value_from_xlsx(file_path, sheet_name, cell_address)

# if isinstance(cell_value, str) and cell_value.startswith("Error"):
#     print(f"An error occurred: {cell_value}")
# else:
#     print(f"Value at cell {cell_address[0]}{cell_address[1]}: {cell_value}")


# def saveJson(summary_name):
#     import json

#     # Your JSON object (as a Python dictionary)
#     json_obj = fromExcel(summary_name)


#     # Specify the file path where you want to save the JSON data
#     file_path = "test.json"

#     # Write the JSON data to the file
#     with open(file_path, 'w',) as json_file:
#         json.dump(json_obj, json_file, indent=4)

#     print(f"JSON data saved to {file_path}")