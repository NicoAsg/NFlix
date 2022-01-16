COOKIE: str = "{ 'name' : 'xfss', 'value' : 'vp3wd5w68qhtm0vb' }"
def cmd_builder(func: str, args: str = None, constants: bool = None, no_quotes: bool = None) -> str:
    if (args):
        if (constants):
            return "driver." + func  + '("""' + open("tmp/consts.js").read() + "\\n" + args + '""")'
        elif (no_quotes):
            return "driver." + func + '(' + args + ')'
        else:
            return "driver." + func + '("""' + args + '""")'
    else:
        return "driver." + func + '()'