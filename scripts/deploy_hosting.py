"""Publish only public site assets over verified, encrypted FTP."""
import ftplib
import os
from pathlib import Path
import ssl


ROOT = Path(__file__).resolve().parents[1] / "tx"
PUBLIC_TYPES = {".html", ".css", ".js", ".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif", ".ico", ".woff", ".woff2", ".ttf", ".eot", ".pdf"}


def public_files(root=ROOT):
    files = []
    for path in root.rglob("*"):
        relative = path.relative_to(root)
        if any(part.startswith(".") for part in relative.parts):
            continue
        if relative.parts[0] in {"tests", "scripts", "docs"}:
            continue
        if path.suffix.lower() not in PUBLIC_TYPES or not path.is_file():
            continue
        if path.is_symlink() or not path.resolve().is_relative_to(root.resolve()):
            raise ValueError(f"Refusing linked asset: {relative}")
        files.append(path)
    # Images and styles arrive before the HTML that references them.
    return sorted(files, key=lambda path: (path.suffix == ".html", str(path)))


def upload(ftp, files, root=ROOT):
    destination = ftp.pwd()
    for path in files:
        relative = path.relative_to(root)
        ftp.cwd(destination)
        for part in relative.parts[:-1]:
            try:
                ftp.cwd(part)
            except ftplib.error_perm as error:
                if not str(error).startswith("550"):
                    raise
                ftp.mkd(part)
                ftp.cwd(part)
        temporary = relative.name + ".uploading"
        with path.open("rb") as source:
            ftp.storbinary("STOR " + temporary, source)
        ftp.rename(temporary, relative.name)
        print(f"Published {relative}")


def main():
    required = ("FTP_HOST", "FTP_USER", "FTP_PASSWORD", "FTP_REMOTE_DIR")
    missing = [name for name in required if not os.environ.get(name)]
    if missing:
        raise SystemExit("Add GitHub repository secrets: " + ", ".join(missing))
    directory = os.environ["FTP_REMOTE_DIR"]
    if ".." in directory.split("/") or any(char in directory for char in "\r\n\0"):
        raise SystemExit("Invalid FTP_REMOTE_DIR")
    with ftplib.FTP_TLS(context=ssl.create_default_context(), timeout=60) as ftp:
        ftp.connect(os.environ["FTP_HOST"], 21)
        ftp.login(os.environ["FTP_USER"], os.environ["FTP_PASSWORD"])
        ftp.prot_p()
        # The site's existing root must exist; never create a guessed root.
        ftp.cwd(directory)
        upload(ftp, public_files())


if __name__ == "__main__":
    main()
