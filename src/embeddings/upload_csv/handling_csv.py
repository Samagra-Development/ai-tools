import os
from datetime import datetime
import random
import pandas as pd


class HandlingCsv():

    temp_dir = 'temp_file/'
    file_name_pre = 'embedding_'

    def __init__(self, file=None) -> None:
        # self.__save_file_media_folder(file)
        if file:
            self.__process(file)

    # creating dataframe object here
    def __process(self, file):
        # dataframe object
        # csv reader object
        df = pd.read_csv(file, encoding='latin-1') 
        print(df)

    def __save_file_media_folder(self, file):
        self.__create_temp_directory()
        file_name = self.temp_dir + self.file_name_pre + self.__time_stamp() + '.csv'
        print(file, file_name)
        print(pd.read_csv(file))
        # file.save(os.path.join(self.temp_dir, file_name))

    def __create_temp_directory(self):
        directory = 'temp_file'
        if not os.path.exists(directory):
            os.makedirs(directory, mode=755)

    def __time_stamp(self):
        try:
            now = datetime.datetime.utcnow()
            return str(int(now.timestamp()))
        except:
            return str(random.randint(10000, 1000000000))