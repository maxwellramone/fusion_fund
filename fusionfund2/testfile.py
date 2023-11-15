

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



# file_path = 'SummarySheets\SummaryLogs.xlsx'

# import pandas as pd

# def process_data_by_model(model):
#     # Open the Excel file
#     excel_file = pd.ExcelFile(file_path)  # Use the variable 'file_path' for consistency

#     # Read the data from the Excel file
#     df = excel_file.parse(excel_file.sheet_names[0])  # Assuming data is in the first sheet

#     # Filter rows based on the specified model
#     model_rows = df[df['model'] == model]

#     # Sort rows by 'SerialNumber' column in descending order and take the top row
#     top_row = model_rows.sort_values(by='SerialNumber', ascending=False).head(1)

#     # Check if there is at least one row
#     if not top_row.empty:
#         # Extract values from the top row and the 'File Name' column
#         result_list = top_row.iloc[0].tolist()
#         result_list.insert(1, top_row['File Name'].iloc[0])  # Insert 'File Name' value at the appropriate position

#         return model_rows

#     else:
#         # If there are no matching rows, return an empty list
#         return []

# # Example usage:
# model = "OpenAI"
# result = process_data_by_model(model)
# print(result)


from toJson import read_stats_file
def convert_to_new_array(input_dict):
    
    result_array = {"series": []}

    for key, value in input_dict.items():
        company_data = {"name": key, "data": []}
        for month in ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]:
            company_data["data"].append(value[month])

        result_array["series"].append(company_data)

    return result_array

diction = read_stats_file(key="sumsbytech")

result = convert_to_new_array(diction)

print(result)