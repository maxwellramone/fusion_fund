from elsapy.elsclient import ElsClient
from elsapy.elssearch import ElsSearch
from elsapy.elsprofile import ElsAuthor
from elsapy.elsdoc import AbsDoc
from pybliometrics.scopus.utils import deduplicate, get_freetoread, listify
from collections import namedtuple
from Bio import Entrez
from pymed import PubMed
import requests
import json

def create_doc():
    fields = 'eid doi pii pubmed_id title subtype subtypeDescription ' \
                'creator afid affilname affiliation_city ' \
                'affiliation_country author_count author_names author_ids url '\
                'author_afids coverDate coverDisplayDate publicationName '\
                'issn source_id eIssn aggregationType volume '\
                'issueIdentifier article_number pageRange description '\
                'authkeywords citedby_count openaccess freetoread '\
                'freetoreadLabel fund_acr fund_no fund_sponsor'
    return namedtuple('Document', fields)

def _join(item, key, sep=";"):
    # """Auxiliary function to join same elements of a list of dictionaries if
    # the elements are not None.
    # """
    try:
        return sep.join([d[key] or "" for d in item["affiliation"]])
    except (KeyError, TypeError):
        return None

def _joinurlTo(item, key, sep=";"):
    try:
        for d in item["link"]:
            if d["@ref"]=="scopus":
                return d["@href"]

    except (KeyError, TypeError):
        return None

def _replace_none(lst, repl=""):
    return [repl if v is None else v for v in lst]

pubmed = PubMed(tool="MyTool", email="amhatre1@binghamton.edu")


def search_query(query):
    Entrez.email = pubmed.email
    handle = Entrez.esearch(db='pubmed',
                            sort='most+recent',
                            retmax='1000',
                            retmode='xml',
                            term=query)
    results = Entrez.read(handle) 
    return results

def fetch_details(id_list):
    ids = ','.join(id_list)
    Entrez.email = pubmed.email
    handle = Entrez.efetch(db='pubmed',
                           retmode='xml',
                           id=ids)
    results = Entrez.read(handle)
    return results


def create_doc():
    fields = 'eid doi pii pubmed_id title subtype subtypeDescription ' \
                'creator afid affilname affiliation_city ' \
                'affiliation_country author_count author_names author_ids url '\
                'author_afids coverDate coverDisplayDate publicationName '\
                'issn source_id eIssn aggregationType volume '\
                'issueIdentifier article_number pageRange description '\
                'authkeywords citedby_count openaccess freetoread '\
                'freetoreadLabel fund_acr fund_no fund_sponsor'
    return namedtuple('Document', fields)

def _join(item, key, sep=";"):
    # """Auxiliary function to join same elements of a list of dictionaries if
    # the elements are not None.
    # """
    try:
        return sep.join([d[key] or "" for d in item["affiliation"]])
    except (KeyError, TypeError):
        return None

def _joinurlTo(item, key, sep=";"):
    try:
        for d in item["link"]:
            if d["@ref"]=="scopus":
                return d["@href"]

    except (KeyError, TypeError):
        return None

def _replace_none(lst, repl=""):
    return [repl if v is None else v for v in lst]

pubmed = PubMed(tool="MyTool", email="amhatre1@binghamton.edu")


def search_query(query):
    Entrez.email = pubmed.email
    handle = Entrez.esearch(db='pubmed',
                            sort='most+recent',
                            retmax='1000',
                            retmode='xml',
                            term=query)
    results = Entrez.read(handle) 
    return results

def fetch_details(id_list):
    ids = ','.join(id_list)
    Entrez.email = pubmed.email
    handle = Entrez.efetch(db='pubmed',
                           retmode='xml',
                           id=ids)
    results = Entrez.read(handle)
    return results


def search_scopus(searchText):
    apikey = "b97a9fb42a8f113a136f96493b0453d9"
    # apikey = "b395bcd63c8fb8ee197217a1cb373cef"
    client = ElsClient(apikey)
    doc_srch = ElsSearch("KEY({}) AND PUBYEAR > 2021".format(searchText), 'scopus')
    doc_srch.execute(client, get_all=False)
    data=[]
    # print("doc_srch   ",doc_srch)
    for result in doc_srch.results:
        data.append(result)
    docresult = []
    response=[]
    doc = create_doc()
    # print("dr   ",data)
    if len(data) > 0:
        for item in data:
            info = {}
            # Parse affiliations
            info["affilname"] = _join(item, 'affilname')
            info["afid"] = _join(item, 'afid')
            info["aff_city"] = _join(item, 'affiliation-city')
            info["aff_country"] = _join(item, 'affiliation-country')
            info["url"] = _joinurlTo(item,'link')
            
            try:
                authors = deduplicate(item['author'])
                surnames = _replace_none([d['surname'] for d in authors])
                firstnames = _replace_none([d['given-name'] for d in authors])
                info["auth_names"] = ";".join([", ".join([t[0], t[1]]) for t in
                                                zip(surnames, firstnames)])
                info["auth_ids"] = ";".join([d['authid'] for d in authors])
                affs = []
                for auth in authors:
                    aff = listify(deduplicate(auth.get('afid', [])))
                    affs.append('-'.join([d['$'] for d in aff]))
                if [a for a in affs if a]:
                    info["auth_afid"] = ';'.join(affs)
                else:
                    info["auth_afid"] = None
            except KeyError:
                pass
            date = item.get('prism:coverDate')
            if isinstance(date, list):
                date = date[0].get('$')
            default = [None, {"$": None}]
            freetoread = get_freetoread(item, ["freetoread", "value"], default)
            freetoreadLabel = get_freetoread(item, ["freetoreadLabel", "value"], default)
            new = doc(article_number=item.get('article-number'),
                        title=item.get('dc:title'), fund_no=item.get('fund-no'),
                        fund_sponsor=item.get('fund-sponsor'),
                        subtype=item.get('subtype'), doi=item.get('prism:doi'),
                        subtypeDescription=item.get('subtypeDescription'),
                        issn=item.get('prism:issn'), creator=item.get('dc:creator'),
                        affilname=info.get("affilname"),
                        author_names=info.get("auth_names"),
                        coverDate=date, volume=item.get('prism:volume'),
                        coverDisplayDate=item.get('prism:coverDisplayDate'),
                        publicationName=item.get('prism:publicationName'),
                        source_id=item.get('source-id'), author_ids=info.get("auth_ids"),
                        aggregationType=item.get('prism:aggregationType'),
                        issueIdentifier=item.get('prism:issueIdentifier'),
                        pageRange=item.get('prism:pageRange'),
                        author_afids=info.get("auth_afid"),
                        affiliation_country=info.get("aff_country"),
                        citedby_count=int(item['citedby-count']),
                        openaccess=int(item['openaccess']),
                        freetoread=freetoread, freetoreadLabel=freetoreadLabel,
                        eIssn=item.get('prism:eIssn'),
                        author_count=item.get('author-count', {}).get('$'),
                        affiliation_city=info.get("aff_city"), afid=info.get("afid"),
                        description=item.get('dc:description'), pii=item.get('pii'),
                        authkeywords=item.get('authkeywords'), eid=item.get('eid'),
                        fund_acr=item.get('fund-acr'), pubmed_id=item.get('pubmed-id'),
                        url=info["url"])
            docresult.append(new)
            docobj={
                    "title": new.title,
                    "author":"dummyr",
                    "affiliation_country": new.affiliation_country,
                    "affiliation_name": new.affilname,
                    # "affiliation_country": item.affiliation_country,
                    "publication_name": new.publicationName,
                    "issn": new.issn,
                    "affiliation_name": new.affilname,
                    "url": new.url,
                    "abstract": '',
                    "liked": False,
                    'datasource': 'scopus'
            }
            response.append(docobj)

    file = json.dumps(response, indent=4)
    with open("api_respone_resultselsapy232.json", "w") as outfile:
        outfile.write(file)    
    return response



def search_pubmed(search_text):

    results = search_query(search_text) 
    id_list = results['IdList']  # type: ignore
    papers = fetch_details(id_list)
    records=[]

    for i, paper in enumerate(papers['PubmedArticle']):  # type: ignore
        title= 'Not Found'
        article_date= 'Not Found'
        author= 'Not Found'
        affiliation_country='Not Found'
        publication_name='Not Found'
        issn='Not found'
        affiliation_name='Not Found'
        url='Not Found'

        errors=[] 
        try:
            title= paper['MedlineCitation']['Article']['ArticleTitle']
        except:
            errors.append("title not found")
        
        try:
            for articledate in paper['MedlineCitation']['Article']['ArticleDate']:
                article_date=articledate["Year"]+"-"+articledate["Month"]+"-"+articledate["Day"]
        except:
            errors.append("date not found")

        try:      
            for affillist in paper['MedlineCitation']['Article']['AuthorList']:
                author=str(affillist["LastName"])+" "+ str(affillist["ForeName"])+"; "+author
        except:
            errors.append("Author not found")

        try:
            affiliation_country =paper['MedlineCitation']['MedlineJournalInfo']['Country']
        except:
            errors.append("affil country not found")

        try:
            publication_name = paper['MedlineCitation']['Article']['Journal']['Title']
        except:
            errors.append("pub name not found")
        
        try:
            issn = str(paper['MedlineCitation']['Article']['Journal']['ISSN'])
        except:
            errors.append("issn not found")

        try:
            for affillist in paper['MedlineCitation']['Article']['AuthorList']:
                for affil in affillist["AffiliationInfo"]:
                    affiliation_name=affil["Affiliation"]+";"+affiliation_name
        except:
            errors.append("Affiliation name not found")

        try:
            url= f"https://pubmed.ncbi.nlm.nih.gov/{paper['MedlineCitation']['PMID']}/"
        except:
            errors.append("url not found")
            

        record = {
            'title' : title,
            'article_date' : article_date,
            'author': author,
            'affiliation_country' : affiliation_country ,
            'publication_name' : publication_name,
            'issn' : issn,
            'affiliation_name' : affiliation_name,
            'url': url,
            "abstract": 'Not Found',
            'liked': False,
            'datasource': 'pubmed'
        }

        records.append(record)        
    return records


    

def search_ieee(search_text):

    format='json'
    max_records = 100
    print(f"Searching text: {search_text}")
    IEEE_API_KEY=""
    fetch_text = f'http://ieeexploreapi.ieee.org/api/v1/search/articles?querytext={search_text}&format={format}&apikey={IEEE_API_KEY}&max_records={max_records}'
    response1 = requests.get(fetch_text)
    response = response1.json()
    response_articles= response["articles"]
    # pprint(response_articles)
    
    records_ieee = []

    for vals in response_articles:

        doc_object = {
            'title' : 'Not found',
            'article_date' : 'Not found',
            'author' : 'Not found',
            'affiliation_country' : '',
            'publication_name' : '',
            'issn' : 'Not found',
            'affiliation_name' : 'Not found',
            'abstract': '',
            'url': vals['pdf_url'],
            'liked': False,
            'datasource': 'ieee'
        }

        if vals["title"] != '':
            if vals["title"] != None:
                # print("vals------", vals["title"])
                doc_object['title'] = vals["title"]

        if vals.get('publication_date', '') != '':
            if vals["publication_date"] != None:
                # print("vals------", vals["publication_date"])
                doc_object['article_date'] = vals["publication_date"]

        # if vals["authors"] != '':
        #     # print("inside authors first---------")
        #     if vals["authors"]["authors"] != '':
        #         # print("inside authors second---------")
        #         if vals["authors"]["authors"]["full_name"] != '':
        #             print("inside fullname---------")
        #             if vals["authors"]["authors"]["full_name"] != None:
        #                 print("vals------", vals["authors"]["authors"]["full_name"])
        #                 # doc_object['authors'] = vals["authors"]

        response_author_name = vals["authors"]
        resp = response_author_name["authors"]

        for vals1 in resp:
            if vals1["full_name"] != '':
                # print("inside fullname---------")
                if vals1["full_name"] != None:
                    print("vals------", vals1["full_name"])
                    doc_object['author'] = vals1["full_name"]

        
        for vals1 in resp:
            if vals1.get("affiliation", "") != '':
                if vals1["affiliation"] != None:
                    for country in pycountry.countries:
                        if country.name in vals1["affiliation"]:
                            print("vals------", type(country.name), country.name)
                            doc_object['affiliation_name'] = country.name
                            print(doc_object['affiliation_name'])

        if vals.get("publication_title", "") != '':
            if vals["publication_title"] != None:
                # print("vals------", vals["publication_title"])
                doc_object['publication_name'] = vals["publication_title"]
        
        # if vals["isbn"] != '':
        #     if vals["isbn"] != None:
        #         print("vals------", vals["isbn"])
        #         doc_object['issn'] = vals["isbn"]
        
        # if vals["issn"] != '':
        #     if vals["issn"] != None:
        #         print("vals------", vals["issn"])
        #         doc_object['issn'] = vals["issn"]

        for vals1 in resp:
            if vals1.get("affiliation", "") != '':
                if vals1["affiliation"] != None:
                    # print("vals------", vals1["affiliation"])
                    doc_object['affiliation_name'] = vals1["affiliation"]
        
        records_ieee.append(doc_object)

    return records_ieee

    import json

def save_search_results(search_name, research_db, results):
    search_results = {
        "search_name": search_name,
        "research_db": research_db,
        "results": results
    }

    try:
        # Check if the file already exists
        with open(f"ResearchStats\{search_name}_{research_db}_search_results.json", 'r') as file:
            existing_data = json.load(file)
            existing_data.update(search_results)

        with open(f"ResearchStats\{search_name}_{research_db}_search_results.json", 'w') as file:
            json.dump(existing_data, file, indent=4)

        print(f"Updating search results for search_name: {search_name} & research_db: {research_db}")

    except FileNotFoundError:
        # If the file doesn't exist, create a new one
        with open(f"ResearchStats\{search_name}_{research_db}_search_results.json", 'w') as file:
            json.dump(search_results, file, indent=4)

        print(f"Inserting search results for search_name: {search_name} & research_db: {research_db}")

    return search_results


def search(search_text, research_db):

    print("searching research ", research_db)
    search_text = "AI Technology"
    results=[]
   
    
    if research_db == 'scopus':
        results = search_scopus(search_text)



        # results = search_all(search_text)
    elif research_db == 'pubmed':
        results = search_pubmed(search_text)
    # elif research_db == 'wos':
    #     results = search_wos(search_text)
    # elif research_db == 'all':
    #     results = search_all(search_text)
    elif research_db == 'ieee':
        results = search_ieee(search_text)
    else:
      pass
        # return JsonResponse({'error': f"No such database: {research_db}"}, safe=False)
    
    search_results = save_search_results(search_text, research_db, results)
    # return JsonResponse(search_results.data, safe=False)


   