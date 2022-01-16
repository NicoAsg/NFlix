from scrap.Util import cmd_builder, COOKIE

class Movie:
    def __init__(self, title: int):
        self.title = title
        open("tmp/consts.js", "w").write("const title = '{}'".format(title))
    
    def commands(self) -> list[str]:
        return [
            # Tirexo: Load Tirexo search page and search the title
            cmd_builder("load", "https://www2.tirexo.work/?do=index_alpha&category=2&lettre={}".format(self.title[0])),
            "exec(open('scrap_cmd/for_tirexo/tirexo/search_alpha.py').read())",
            
            # Tirexo: Select season, quality and episode
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/tirexo/movie/select_quality_lang.js").read(), True),
            cmd_builder("wait_js", open("scrap_cmd/for_tirexo/tirexo/wait/wait_quality.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/tirexo/movie/select_link.js").read()),
            cmd_builder("close_tab"),
            cmd_builder("switch_window", "current_window()"),

            # HiIpStats: Deals with the captcha
            cmd_builder("wait_js", open("scrap_cmd/for_tirexo/hyipstats/wait/wait_load.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/hyipstats/valid_captcha.js").read()),
            cmd_builder("wait_js", open("scrap_cmd/for_tirexo/hyipstats/wait/wait_succeeded.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/hyipstats/click_captcha.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/hyipstats/go_utb.js").read()),
            cmd_builder("close_tab"),
            cmd_builder("switch_window", "current_window()"),

            # UpToBox: Scrap the iframe
            cmd_builder("add_cookie", COOKIE, False, True),
            cmd_builder("wait_js", open("scrap_cmd/for_tirexo/uptobox/wait/wait_load.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/uptobox/go_uts.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/uptobox/get_iframe.js").read()),
        ]