# DevLog #1: Calculating the number of seconds until midnight

## Disclaimer

This is an old article that I once wrote on DEV.to and since I want to start my own blog I'll review it and add it to my new blog.

## Introduction

I know this might be very straight forward for some developers but I found this
a pretty intriguing and fun quick problem to solve, it also might help some beginners furthermore.
How can you find the number of seconds until midnight ?....with python...in an elegant way.
My first approach to this was to subtract from the 24 hours the number of hours
that passed today, and so multiply with 60 to get the number of seconds.

```python
    from datetime import datetime

    seconds_until_midnight = (24 - datetime.now().hour) * 60 * 60
```

The pros of this formula is that is fast, but it lack the readability of python
coding. By using datetime package from python you can increase the readability
and the code follows as this:

```python
    from datetime import datetime, timedelta, time

    now = datetime.now()
    midnight = datetime.combine(now + timedelta(days=1), time())

    seconds_until_midnight = (midnight - now).seconds
```

`midnight` is calculated by combining tomorrow date with time, which will strip
the time to 00:00. `seconds_until_midnight subtract` from midnight datetime the
`now` datetime to get the time-frame between these two.

You can also add all this to a method:

```python
    from datetime import datetime, timedelta, time

    def seconds_until_midnight() -> int:
        """Calculate seconds until midnight"""
        now = datetime.now()
        midnight = datetime.combine(now + timedelta(days=1), time())

        return (midnight - now).seconds
```