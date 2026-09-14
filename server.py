import os
import sys
import http.server
import socketserver

PORT = 3000
DIRECTORY = os.path.join(os.path.dirname(__file__), "dist")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        # Silent logging
        pass

def run():
    socketserver.TCPServer.allow_reuse_address = True
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            print(f"Server started on http://localhost:{PORT}")
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error: {e}")

if __name__ == '__main__':
    run()
