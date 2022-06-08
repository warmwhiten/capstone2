from collections import defaultdict
from scipy.sparse import csr_matrix

from .com import scan_vocabulary
from .com import tokenize_sents

def cooccurrence(tokens, vocab_to_idx, window=2, min_cooccurrence=2, verbose=False):

    counter = defaultdict(int)
    for s, tokens_i in enumerate(tokens):
        vocabs = [vocab_to_idx[w] for w in tokens_i if w in vocab_to_idx]
        n = len(vocabs)
        for i, v in enumerate(vocabs):
            if window <= 0:
                b, e = 0, n
            else:
                b = max(0, i - window)
                e = min(i + window, n)
            for j in range(b, e):
                if i == j:
                    continue
                counter[(v, vocabs[j])] += 1
                counter[(vocabs[j], v)] += 1
    counter = {k:v for k,v in counter.items() if v >= min_cooccurrence}
    n_vocabs = len(vocab_to_idx)
    return dict_to_mat(counter, n_vocabs, n_vocabs)

def word_graph(sents, tokenize=None, min_count=2, window=2,
    min_cooccurrence=2, vocab_to_idx=None, verbose=False):
    if vocab_to_idx is None:
        idx_to_vocab, vocab_to_idx = scan_vocabulary(sents, tokenize, min_count)
    else:
        idx_to_vocab = [vocab for vocab, _ in sorted(vocab_to_idx.items(), key=lambda x:x[1])]

    tokens = tokenize_sents(sents, tokenize)
    g = cooccurrence(tokens, vocab_to_idx, window, min_cooccurrence, verbose)
    return g, idx_to_vocab



def dict_to_mat(d, n_rows, n_cols):
    rows, cols, data = [], [], []
    for (i, j), v in d.items():
        rows.append(i)
        cols.append(j)
        data.append(v)
    return csr_matrix((data, (rows, cols)), shape=(n_rows, n_cols))