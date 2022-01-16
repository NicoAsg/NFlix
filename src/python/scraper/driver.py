from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

class Scraper:

    ### Utils ###
    def __init__(self, driver: webdriver.Chrome, client: str):
        self.driver = driver
        self.client = client
    def getDriver(self):
        return self.driver
    def getClient(self):
        return self.client


    ### Scraping Functions ###
    # Load the page
    def load(self, url: str):
        self.driver.get(url)

    # Quit the browser
    def quit(self):
        self.driver.quit()

    # class Navigate :
    # Go back to the previous page
    def previous(self):
        self.driver.back()

    # Go to the next page
    def next(self):
        self.driver.forward()

    # Refresh the page
    def refresh(self):
        self.driver.refresh()

    def wait_js(self, jsToWait):
        def until_site(d):
            if self.js_cmd("return " + jsToWait) == 'false':
                return False
            else:
                return True
        WebDriverWait(self.driver, timeout = 17).until(until_site)

    # class Infos:
    # Get the page title
    def title(self):
        return self.driver.title

    # Get the current URL
    def current_url(self):
        return self.driver.current_url

    # class Window:
    # Get the window handle (id)
    def current_window(self):
        return self.driver.current_window_handle

    # Switch window
    def switch_window(self, actual_window):
        for window_handle in self.driver.window_handles:
            if window_handle != actual_window:
                self.driver.switch_to.window(window_handle)
                break

    # Open new window
    def new_window(self):
        self.driver.switch_to.new_window('tab')

    # Open new tab
    def new_tab(self):
        self.driver.switch_to.new_window('window')

    # Close actual window
    def close_tab(self):
        self.driver.close()

    # class Find:
    # Find an element with css selector
    def find_by_selector(self, css_selector):
        return self.driver.find_element(By.CSS_SELECTOR, css_selector)

    # Find an element by id
    def find_by_id(self, id):
        return self.driver.find_element(By.ID, id)

    # Find an element by tag name
    def find_by_tag(self, tag_name):
        return self.driver.find_element(By.TAG_NAME, tag_name)

    # class Screenshot:
    # Take a screenshot
    # def screenshot(self):
    #    self.driver.save_sreenshot("./screenshot.png")

    # Take a screenshot of an element
    def screenshot_element(self, element):
        element.screenshot("./screenshot.png")
    # class JS:
    
    # Execute javascript
    def js_cmd(self, command):
        return self.driver.execute_script(command)

    def add_cookie(self, cookie):
        self.driver.add_cookie(cookie)
        self.refresh()