from summary import summarize
from excel import toExcel
from toJson import update_stats_file, read_stats_file
from datetime import datetime


websites = [
    {
        "OPENAI" : [ 
            "https://en.wikipedia.org/wiki/OpenAI"

        ],
        "SAIL" : [
            "https://web.stanford.edu/~learnest/sail/"

        ],
        "BAIR" : [
            "https://bair.berkeley.edu/blog/"

        ],
        "VECTOR" : [
            "https://vectorinstitute.ai/vector-institute-2022-23-annual-report-accelerating-ai-in-ontario/"

        ],
        "CMU" : [
            "https://en.wikipedia.org/wiki/Robotics_Institute"

        ],
        "FAIR" : [
            "https://en.wikipedia.org/wiki/Meta_AI"

        ],
        "GOOGLEAI" : [
            "https://en.wikipedia.org/wiki/Google_AI"

        ],
        "AI2" : [
            "https://en.wikipedia.org/wiki/Allen_Institute_for_AI"

        ],
        "DEEPMIND" : [
            "https://en.wikipedia.org/wiki/Google_DeepMind"

        ]
                        
    }
            
]

def collectData():
    keys = list(websites[0].keys())
    
    update_stats_file("totalTechsTracked", new_value=len(keys))
    
    for i in range(len(websites[0])):
        summary = []
        for k in range(len(websites[0][keys[i]])):
            summarize(keys[i], websites[0][keys[i]][k], summary)            
        print(summary) 

        toExcel(summary, keys[i])
    print("Complete!")
    

# collectData()

# content = getContent("https://en.wikipedia.org/wiki/OpenAI")

# summarize("OpenAI", "https://en.wikipedia.org/wiki/OpenAI")
# print(weeklySummary)
# toExcel()





# Total Number of Words
# Number of AI Technologies Tracked
# Total Number of Summaries
# Summaries Per Company Per Month