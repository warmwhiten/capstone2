from setuptools import setup, find_packages
import textrank

setup(
    name=textrank.__name__,
    version=textrank.__version__,
    packages=find_packages(),
    zip_safe=False,
    setup_requires=[]
)