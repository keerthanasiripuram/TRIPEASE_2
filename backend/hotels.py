import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import os
import sys
print("heyyyyyyyyyyy")

pythonScriptPath = sys.argv[0]
csvFilePath = sys.argv[1]
destination = sys.argv[2]
checkIn= sys.argv[3]
checkOut = sys.argv[4]
rating=sys.argv[5]
# category=sys.argv[7]
for dirname, _, filenames in os.walk('/kaggle/input'):
    for filename in filenames:
        os.path.join(dirname, filename)
#print("helloooooo")
df=pd.read_csv('./csv_data.csv')
#print(df.head())

missing_values = df.isnull().sum()
#print(missing_values)

unique_values = df.nunique()
#print(unique_values)

stat_summary = df['Total Rooms'].describe()
#print(stat_summary)

state_distribution = df['State'].value_counts()
#print(state_distribution)

category_distribution = df['Category'].value_counts()
#print(category_distribution)

# Converting 'Start Date' and 'Expiry Date' to datetime format
df['Start Date'] = pd.to_datetime(df['Start Date'], dayfirst=True)
df['Expiry Date'] = pd.to_datetime(df['Expiry Date'], dayfirst=True)

# Checking the distribution of the 'Alcohol' column
alcohol_distribution = df['Alcohol'].value_counts(dropna=False)

# Checking the range of 'Start Date' and 'Expiry Date'
start_date_range = df['Start Date'].min(), df['Start Date'].max()
expiry_date_range = df['Expiry Date'].min(), df['Expiry Date'].max()

#print(alcohol_distribution, start_date_range, expiry_date_range)

#First of all we need to fill the missing values with 'Unknown'
# Filling missing values in the 'Alcohol' column
#print(df['Alcohol'].fillna('Unknown', inplace=True))

# Verifying the operation
#print(df['Alcohol'].value_counts(dropna=False))

#print(df['Alcohol'])

df['Alcohol'].fillna("Not Mentioned",inplace=True)
#print(df.isnull().sum())

df.drop('S.No.',inplace=True,axis=1)
#print(df.info())

#changing category values
#print(df['Category'].unique())

df['Category'] = df['Category'].str.split(" ").str[0]
#print(df['Category'].unique())

df = df.astype({'Category':'int'})
df.rename(columns={'Category':'StarRating'},inplace=True) #changing column name - category to StarRating
#print(df.info())

star_5 = df[df['StarRating']==5]
#print(star_5.head())

star5_viz = star_5.groupby('State').size().reset_index()
star5_viz.rename(columns={0:'Hotels'},inplace=True)
#print(star5_viz.head())

data=df.head()
#print(data)
def recommend_hotels(destination,checkIn,checkOut):
    # Filter hotels based on user's preferences
    #print(destination,checkIn,checkOut,rating)
    #print((df['City'] == destination))
    # print((df['StarRating'] == rating))
    #print((df['Start Date'] == checkIn))
    #print((df['Expiry Date'])== checkOut)
    recommended_hotels = df[(df['City'] == destination) & (df['Start Date'] == checkIn) 
    & (df['Expiry Date']==checkOut)]
    # Sort hotels by alcohol availability
    recommended_hotels = recommended_hotels.sort_values('Alcohol', ascending=False)
    #print(recommend_hotels.head())
    # Select only the desired columns and get the first 5 records
    selected_records = recommended_hotels[['Hotel Name', 'Address','Total Rooms']].head().values.tolist()
    print("55",selected_records)
    return selected_records
recommendations=recommend_hotels(destination,checkIn,checkOut)
# Test the function
#recommendations=recommend_hotels('Tirupati','3 Star','19-02-2021','18-02-2026','0')
#recommendations=recommend_hotels(destination,checkIn,checkOut,rating,category)

#print("data",data['Start Date'],data['Expiry Date'])
# def recommend_hotels(destination,rating,startDate,endDate,alcohol):
#     # Filter hotels based on user's preferences
#     #print(destination)
#     recommended_hotels = df[(df['City'] == destination)
#                             & (df['StarRating']==rating) &(df['Start Date'] == startDate) 
#     & (df['Expiry Date']==endDate) & (df['Alcohol']==alcohol)
#                             ] 
#     # Sort hotels by alcohol availability
#     recommended_hotels = recommended_hotels.sort_values('Alcohol', ascending=False)

#     # Select only the desired columns and get the first 5 records
#     selected_records = recommended_hotels[['Hotel Name', 'Address', 'Total Rooms']].head().values.tolist()
#     #print("55",selected_records)
#     return selected_records
# recommendations=recommend_hotels('Tirupati',3,'2021-02-19','2026-02-18','1')
print(recommendations)
records=[]
for record in recommendations:
    mp={}
    mp["Hotel Name"]=record[0]
    mp["Address"]=record[1]
    mp["Total Rooms"]=record[2]
    records.append(mp)
    #print("recrd",mp)
#print(recommendations)
print("record:",records)
