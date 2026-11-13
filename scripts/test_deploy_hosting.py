import ftplib
from pathlib import Path
import tempfile
import unittest

from deploy_hosting import public_files, upload


class DeploymentTests(unittest.TestCase):
    def test_only_public_assets_and_html_last(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            for name in ["index.html", "tx.css", "images/logo.svg", "tests/private.js", "scripts/tool.js", "docs/internal.html", ".htaccess", ".env", "directions.json"]:
                path = root / name
                path.parent.mkdir(parents=True, exist_ok=True)
                path.write_text("test")
            files = public_files(root)
            self.assertEqual({str(p.relative_to(root)) for p in files}, {"index.html", "tx.css", "images/logo.svg"})
            self.assertEqual(files[-1].name, "index.html")
            (root / "linked.svg").symlink_to(root / "images/logo.svg")
            with self.assertRaises(ValueError):
                public_files(root)

    def test_failed_upload_does_not_replace_live_file(self):
        class BrokenFTP:
            def pwd(self):
                return "/site"

            def cwd(self, directory):
                pass

            def storbinary(self, command, source):
                self.command = command
                raise ftplib.error_temp("Connection lost")

            def rename(self, source, target):
                raise AssertionError("Live file must remain untouched")

        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            path = root / "index.html"
            path.write_text("new version")
            ftp = BrokenFTP()
            with self.assertRaises(ftplib.error_temp):
                upload(ftp, [path], root)
            self.assertEqual(ftp.command, "STOR index.html.uploading")


if __name__ == "__main__":
    unittest.main()
