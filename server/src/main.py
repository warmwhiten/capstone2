from wordcloud import WordCloud
import matplotlib.pyplot as plt
import uuid
from sumtext import KS
from sumtext import KSS
import numpy as np
from operator import itemgetter
from PyKomoran import *


def generate_wordcloud(keyword):
    keyword_dict = {}
    for i in keyword:
        keyword_dict[i[0].split('/')[0]] = i[1]
    
    print(keyword_dict, type(keyword_dict))

    wordcloud = WordCloud(font_path='font/SUIT-Regular.ttf', background_color='white', width=400, height=400)
    gen = wordcloud.generate_from_frequencies(keyword_dict) 

    plt.imshow(gen)
    plt.axis('off')

    imageID = uuid.uuid1()

    gen.to_file('./Image/'+str(imageID)+'.png')

    return imageID





def komoran_tokenize(sent):
    words = sent.split()
    words = [w for w in words if ('/NN' in w or '/XR' in w or '/VA' in w or '/VV' in w)]
    return words

def run(document, sumkey, topk_size):
    texts = document.split('.')
    topk_size = len(texts) * topk_size 

    komoran = Komoran('STABLE')
    sents = []
    for text in texts:
        tokened_text = komoran.get_plain_text(text)
        sents.append(tokened_text)

    keyword_extractor = KS(
        tokenize = komoran_tokenize,
        window = -1,
        verbose = False,
        sumkey = sumkey
    )
    keywords = keyword_extractor.summarize(sents, topk=30)
    
    imageID = generate_wordcloud(keywords)
    summarizer = KSS(
        tokenize = lambda x:x.split(),
        min_sim = 0.1,
        verbose = False
    )
    bias = np.ones(len(texts))
    print(topk_size)
    keysents = summarizer.summarize(texts, topk=topk_size, bias=bias)
    keysents.sort(key=itemgetter(0))
    result = []
    ret = ''
    for _, _, sent in keysents:
        sent = sent.replace('&#39;', "'")
        ret = ret + sent + ' '
    result.append(ret)
    result.append(imageID)
    return result



