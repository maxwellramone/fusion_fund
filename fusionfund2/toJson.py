import json

filename = r"jsonFiles\SummaryStats.json"




def read_stats_file(key=None):
    # Reading the data from the JSON file
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
    
    if key is not None:
        return data[key]
    
    return data




def update_stats_file(key, new_value=None, added_value=None, nested_key=None, nested_value=None, double_nested_key=None):
    # Reading the existing data from the JSON file
    with open(filename, 'r') as json_file:
        data = json.load(json_file)
    
    key = key.lower()
    
    
    
    # If a nested key and value are provided, update the nested dictionary
    if added_value is None:
        if new_value is not None:
            if nested_key is not None and nested_value is not None:
                nested_key = nested_key.upper()
                if key not in data or not isinstance(data[key], dict):
                    data[key] = {}
                data[key][nested_key] = nested_value
            else:
                # Updating the data with the new key-value pair
                data[key] = new_value
            
        # Will Add 1 to the value if no new value is provided
        elif nested_key is None: 
            data[key] += 1
        elif double_nested_key is None:
            double_nested_key = double_nested_key.lower()
            data[key][nested_key][double_nested_key] += 1
    else:
        data[key] += added_value
    
    # Writing the updated data back to the JSON file
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=2)
        


def convert_to_new_array(input_dict):
    
    result_array = {"series": []}

    for key, value in input_dict.items():
        company_data = {"name": key, "data": []}
        for month in ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]:
            company_data["data"].append(value[month])

        result_array["series"].append(company_data)

    return result_array



# # Example usage:
# # Assuming 'output.json' already exists from the previous examples
# update_json_file('totalWords', 'New value for totalWords')
# update_json_file('totalTechsTracked', 'New value for totalTechsTracked')
# update_json_file('totalSums', 'New value for totalSums')
# update_json_file('summaries', nested_key='mar', nested_value='New value for March summary')

# # Example usage:
# create_json_file()

# Total Number of Words
# Number of AI Technologies Tracked
# Total Number of Summaries
# Summaries Per Company Per Month




# def create_json_file():

    

#     # Writing the data to a JSON file
#     with open(filename, 'w') as json_file:
#         json.dump(data, json_file, indent=2)


# data = {
#     "totalWords": "",
#     "totalTechsTracked": "",
#     "totalSums": "",
#     "techSums": {
#         "OPENAI" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "SAIL" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "BAIR" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "VECTOR" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "CMU" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "FAIR" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "GOOGLEAI" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         },
#         "AI2" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0           
#         },
#         "DEEPMIND" :
#         {
#             "jan": 0,
#             "feb": 0,
#             "mar": 0,
#             "apr": 0,
#             "may": 0,
#             "jun": 0,
#             "jul": 0,
#             "aug": 0,
#             "sep": 0,
#             "oct": 0,
#             "nov": 0,
#             "dec": 0            
#         }
#     }
# }


