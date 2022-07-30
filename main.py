import os
import requests
import logging
import sys

logging.basicConfig(
	level=logging.DEBUG,
	format='%(asctime)s:%(levelname)s: %(message)s',
	handlers={
            logging.FileHandler('app.log'),
            logging.StreamHandler(sys.stdout)
            }
	)

counter = 0
total_successfull_downloads = 0
total_error_count = 0
failed_urls = []

download_path = 'downloads'

logging.info('Starting....')

with open('data.txt', 'r', encoding='utf-8') as file:
	for line in file.readlines():
		counter+=1
		line = str(line).strip()
		logging.debug(f'Starting download of image {counter} link:{line}')

		try:
			response = requests.get(line)
		except Exception as err:
			logging.error(f'Failed to download image... error: \n {err}')
			total_error_count+=1
			failed_urls.append(line)

		open(os.path.join(download_path, f'vk_sv_img_{counter}.jpg'), 'wb')\
			.write(response.content)
		total_successfull_downloads+=1

logging.info(f'Download completed.')
logging.info(f'Total downloads: {total_successfull_downloads}.')
logging.info(f'Total failed downloads: {total_error_count}.')