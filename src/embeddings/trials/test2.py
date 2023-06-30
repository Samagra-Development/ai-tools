import cv2
import pytesseract
import PIL


pytesseract.pytesseract.tesseract_cmd = "Tesseract-OCR//tesseract.exe"
tessdata_dir_config = '--tessdata-dir "Tesseract-OCR/tessdata"'

def img_process(img):
    # Preprocessing the image starts
    img = cv2.resize(img, (0, 0), fx = 1, fy = 1)
 
    # Convert the image to gray scale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # Performing OTSU threshold
    ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
    
    # Specify structure shape and kernel size.
    # Kernel size increases or decreases the area
    # of the rectangle to be detected.
    # A smaller value like (10, 10) will detect
    # each word instead of a sentence.
    rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (8, 8)) #18,18
    
    # Applying dilation on the threshold image
    dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)
    
    # Finding contours
    contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)

    cv2.drawContours(img, contours, -1, (0, 255, 0), 1)

    cv2.imshow('Rectangle',img)
    cv2.imwrite("test.jpg", img)
    cv2.waitKey(0)
    # getting coordinates of all the contours
    # co_ord = get_coord(img,contours)
    
    # # sorting the co-ordinates and then getting the text from those contours 
    # text = sort_coord(co_ord)


img_process(cv2.imread('ss1.png'))