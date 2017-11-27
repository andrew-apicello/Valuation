# https://stackoverflow.com/questions/29462108/sklearn-linear-regression-x-and-y-input-format

import sys, json;
import matplotlib.pyplot as plt
import numpy as np
from sklearn import datasets, linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.svm import SVR


# data = json.load(sys.stdin)
data = sys.stdin.readline()
# data = data.join("")
data = data.split(",")


dates = []
prices = []


for i in reversed(data):
	prices.append(int(i))

x=0
while x < 99:
	dates.append(x)
	x = x+1


reg = linear_model.LinearRegression()
dates_train = np.array(dates)
prices_train = np.array(prices)
reg.fit(dates_train[:, np.newaxis], prices_train[:, np.newaxis])

print(reg.coef_ * 100 + reg.intercept_)




def predict_price(dates, prices):

	plt.plot(dates, prices, color='red', label='Test')
	plt.xlabel("Index")
	plt.ylabel("Price")
	plt.title("Support Vector Regression")
	plt.legend()
	plt.show()

# predict_price(dates,prices)












# dataReal = json.load(sys.stdin)




    # dates = np.reshape(dates,len(dates),1)

    # svr_len = SVR(kernal = 'linear', C = 1e3)
    # svr_poly = SVR(kernal = 'poly', C = 1e3, degree = 2)
    # svr_rbf = SVR(kernal= 'rbf', C = 1e3, gamma = 0.1)

    # svr_len.fit(dates, prices)
    # svr_poly.fit(dates, prices)
    # svr_rbf.fit(dates, prices)

    # plt.scatter(dates, prices, color='black',label="Scatter")
    # plt.plot(dates, svr_len.predict(dates), color='red', label='Linear model')
    # plt.plot(dates, svr_poly.predict(dates), color='green', label='Poly model')
    # plt.plot(dates, svr_rbf.predict(dates), color='blue', label='RBF model')

    # return svr_lin.predict(x)[29], svr_poly.predict(x)[0], svr_rbf.predict(x)[0]  

#     predicted_price = predict_price(dates, prices, 20)
# print(predicted_price)
