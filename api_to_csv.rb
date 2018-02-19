require 'net/http'
require 'uri'
require 'json'
require 'csv'

prefix = 'https://api.bls.gov/publicAPI/v2/timeseries/data/'
indicator_ids = ['LNS12300060', 'LNS12032194', 'CES0500000003']
headers = ['date', 'value', 'indicator_id']

CSV.open('indicators.csv', "wb") do |csv|
  csv << headers
  indicator_ids.each do |indicator_id|
    uri = URI.parse(prefix + indicator_id)
    response = Net::HTTP.get_response(uri)
    results = JSON.parse(response.body)
    readings = results['Results']['series'].first['data']
    readings.each do |reading|
      date = "#{reading['period'][1..-1]}/#{reading['year']}"
      csv << [date, reading['value'], indicator_id]
    end
  end
end

# API response signature:
# {
#   'year'=>'2017',
#   'period'=>'M11',
#   'periodName'=>'November',
#   'value'=>'79.0',
#   'footnotes'=>[{}]
# }