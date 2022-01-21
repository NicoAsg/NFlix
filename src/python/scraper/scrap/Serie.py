from scrap.Util import cmd_builder, COOKIE

class Serie:
    def __init__(self, title: str, season: str, episode: str):
        self.title = title
        self.season = season
        self.episode = episode
        open("tmp/consts.js", "w").write("const title = '{}'\nconst season = {}\nconst episode = {}".format(title, season, episode))
    
    def commands(self) -> list[str]:
        return [
            # Tirexo: Load Tirexo search page and search the title
            """exec("start_letter = '""" + self.title[0] + """'")""",
            """exec("category = '15'")""",
            "exec(open('scrap_cmd/for_tirexo/tirexo/search_alpha.py').read())",
            
            # Tirexo: Select season, quality and episode
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/tirexo/anime_serie/select_season.js").read(), True),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/tirexo/anime_serie/select_quality_lang.js").read(), True),
            cmd_builder("wait_js", open("scrap_cmd/for_tirexo/tirexo/wait/wait_quality.js").read()),
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/tirexo/anime_serie/select_episode.js").read(), True),
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
            cmd_builder("js_cmd", open("scrap_cmd/for_tirexo/uptobox/get_iframe.js").read())
        ]
