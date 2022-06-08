from sklearn.preprocessing import normalize

import numpy as np

def pagerank(x, df=0.85, max_iter=30, bias=None):
    assert 0 < df < 1
    A = normalize(x, axis=0, norm='l1')
    R = np.ones(A.shape[0]).reshape(-1,1)
    if bias is None:
        bias = (1 - df) * np.ones(A.shape[0]).reshape(-1,1)
    else:
        bias = bias.reshape(-1,1)
        bias = A.shape[0] * bias / bias.sum()
        assert bias.shape[0] == A.shape[0]
        bias = (1 - df) * bias
    for _ in range(max_iter):
        R = df * (A * R) + bias
    return R