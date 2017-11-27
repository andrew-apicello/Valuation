import numpy as np
from sklearn.svm import SVR
import matplotlib.pyplot as plt

dates = []
prices = []

def get_data(filename)

def predict_price(dates, prices, x):
    dates = np.reshape(dates,len(dates),1)

    svr_len = SVR(kernal = 'linear', C = 1e3)
    svr_poly = SVR(kernal = 'poly', C = 1e3, degree = 2)
    svr_rbf = SVR(kernal= 'rbf', C = 1e3, gamma = 0.1)

    svr_lin.fit(dates, prices)
    svr_poly.fit(dates, prices)
    svr_rbf.fit(dates, prices)

    plt.scatter(dates, prices, color='black',label)
    plt.plot(dates, svr_lin.predict(dates), color='red', label='Linear model')
    plt.plot(dates, svr_poly.predict(dates), color='green', label='Poly model')
    plt.plot(dates, svr_rbf.predict(dates), color='blue', label='RBF model')

    plt.xlabel("Date")
    plt.ylabel("Price")
    plt.title("Support Vector Regression")
    plt.legend()
    plt.show()

predicted_price = predict_price(dates, prices, 29)
print(predicted_price)