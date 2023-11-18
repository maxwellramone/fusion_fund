

# file_path = 'SummarySheets\SummaryLogs.xlsx'

# import pandas as pd

# def process_data_by_model(model):
#     # Open the Excel file
#     excel_file = pd.ExcelFile('SummarySheets\SummaryLogs.xlsx')  # Replace 'your_file.xlsx' with the actual file path

#     # Read the data from the Excel file
#     df = excel_file.parse(excel_file.sheet_names[0])  # Assuming data is in the first sheet

#     # Filter rows based on the specified model
#     model_rows = df[df['model'] == model]

#     # Sort rows by 'SerialNumber' column in descending order
#     model_rows = model_rows.sort_values(by='SerialNumber', ascending=False)

#     # Check if there are at least three rows
#     if len(model_rows) >= 3:
#         # Extract values from the 'File Name' column of the first three rows
#         file_names = model_rows.iloc[:3]['File Name'].tolist()

#         # Extract values from each row and store them in a list
#         result_list = model_rows.iloc[0].tolist() + model_rows.iloc[1].tolist() + model_rows.iloc[2].tolist()

#         # Insert 'File Name' values at the appropriate positions in the list
#         result_list.insert(1, file_names[0])
#         result_list.insert(5, file_names[1])
#         result_list.insert(9, file_names[2])

#         return result_list

#     else:
#         # If there are fewer than three rows, return an empty list
#         return []

# # Example usage:
# model = "OpenAI"
# result = process_data_by_model(model)
# print(result)



# ###############################################################



file_path = 'fusionfund2\SummarySheets\SummaryLogs2 (1).xlsx'

import pandas

def process_data_by_model(model):
    try:
        # Open the Excel file
        excel_file = pandas.ExcelFile(file_path)  # Use the variable 'file_path' for consistency

        # Read the data from the Excel file
        df = excel_file.parse(excel_file.sheet_names[0])  # Assuming data is in the first sheet

        # Filter rows based on the specified model
        model_rows = df[df['model'] == model]
        model_rows.sort_values(by='SerialNumber', ascending=False)  # Sort in-place
        print(model_rows)
        # Create a list of values from the 'File Name' column
        result_list = model_rows['File Name'].tolist()

        # Take only the first three values if there are more than three
        result_list = result_list[-3:]

        return result_list

    except Exception as e:
        return [str(e)]  # Return the error message as a list

# Example usage:
model = "OpenAI"
result = process_data_by_model(model)
print(result)
