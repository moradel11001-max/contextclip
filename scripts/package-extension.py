"""
Package ContextClip dist directory into a Chrome/Edge Web Store ready ZIP file.
"""
import os
import zipfile

def package_zip():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dist_dir = os.path.join(base_dir, "dist")
    out_zip = os.path.join(dist_dir, "contextclip-v1.0.0.zip")
    
    if not os.path.exists(dist_dir):
        print("Error: dist/ directory does not exist. Run 'npm run build' first.")
        return False
        
    print(f"Creating extension zip: {out_zip}")
    file_count = 0
    with zipfile.ZipFile(out_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
        for root, dirs, files in os.walk(dist_dir):
            for file in files:
                # Exclude non-extension files and archives
                if file.endswith('.zip') or file.startswith('psychstats') or file.startswith('download-psychstats'):
                    continue
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, dist_dir)
                zf.write(file_path, arcname)
                file_count += 1
                print(f"  + Added: {arcname}")
                
    zip_size_kb = os.path.getsize(out_zip) / 1024
    print(f"\nSuccessfully packaged {file_count} files into {out_zip} ({zip_size_kb:.1f} KB)")
    return True

if __name__ == "__main__":
    package_zip()
