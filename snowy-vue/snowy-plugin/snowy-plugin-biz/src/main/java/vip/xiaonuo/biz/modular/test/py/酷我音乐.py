import requests
from urllib import parse
import prettytable as pt




def download():
    searchKey = input('请输入你要下载的歌手或者歌曲名：')
    # 转变为url编码
    searchKey = parse.quote(searchKey)

    headers = {
        # 浏览器基本信息
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
        # 辨别用户的身份
        'Cookie': '_ga=GA1.2.1121755015.1666467338; _gid=GA1.2.1174013141.1666467338; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1666467338,1666519762; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1666556213; kw_token=KYRWB44HCR',
        # 认证令牌
        'csrf': 'KYRWB44HCR',
        # 指定的请求资源的域名
        'Host': 'www.kuwo.cn',
        # 用来跟踪Web请求来自哪个页面，是从什么网站来的。
        'Referer': 'http://www.kuwo.cn/search/list?key='+searchKey
    }
    url = f'http://www.kuwo.cn/api/www/search/searchMusicBykeyWord?key={searchKey}&pn=1&rn=100'
    json_data = requests.get(url=url, headers=headers).json()
    song_list = json_data['data']['list']
    count = 0
    info_list = []
    tb = pt.PrettyTable()
    tb.field_names = ['序号', '歌名', '歌手']
    for song in song_list:
        singer_name = song['artist']
        song_name = song['name']
        # album_name = song['album']
        rid = song['rid']
        info_list.append([rid, song_name, singer_name])
        tb.add_row([count, song_name, singer_name])
        count += 1
    print(tb)

    searchKey = input('是否要下载歌单内所有歌曲（0否1是）：')
    if searchKey == '1':
        # while True:
            # input_index = eval(input("请输入要下载歌曲的序号(-1退出): "))
            # if input_index == -1:
            #     break
            # download_info = info_list[input_index]
            # 流畅音质  128k
            # 高频音质  192k
            # 超品音质  320k
            i = 1
            for download_info in info_list:
                song_info_url = f'https://www.kuwo.cn/api/v1/www/music/playUrl?mid={download_info[0]}&type=convert_url3&br=320kmp3'
                music_url = requests.get(song_info_url, headers=headers).json()['data']['url']
                music_data = requests.get(music_url).content
                with open(f'D:/xieshudi/music/{download_info[1].replace("/","").replace("|","")}-{download_info[2].replace("/","").replace("|","")}.mp3', mode='wb') as f:
                    f.write(music_data)
                print("第"+str(i)+"首歌下载完成！")
                i = i+1
            print(f'{download_info[1]}', '全部下载完成！！！') 
            download()  
    else:
        download()    
download()  