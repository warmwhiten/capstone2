import gensim

model = gensim.models.Word2Vec.load('./word2vec/word2vec.bin')
print(model.wv.similarity('문장', '밥'))

