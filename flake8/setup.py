from setuptools import setup, find_packages

setup(
    name="flake8-single-word-lowercase",
    version="0.1.0",
    description="A Flake8 plugin to enforce single-word lowercase module names",
    author="Your Name",
    author_email="your.email@example.com",
    url="https://github.com/yourusername/flake8-single-word-lowercase",
    packages=find_packages(),
    install_requires=["flake8", "flake8-plugin-utils"],
    entry_points={"flake8.extension": ["SWL = flake8_single_word_lowercase:get_plugin"]},
    classifiers=[
        "Development Status :: 4 - Beta",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
    ],
)