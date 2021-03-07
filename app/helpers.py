import boto3
import botocore
import os

from .config import Config
config_instance = Config()


S3_KEY = config_instance.S3_KEY
S3_SECRET = config_instance.S3_SECRET
S3_BUCKET = config_instance.S3_BUCKET
S3_LOCATION = "http://{}.s3.amazonaws.com/".format(S3_BUCKET)


s3 = boto3.client("s3", aws_access_key_id=S3_KEY,
                  aws_secret_access_key=S3_SECRET)


def upload_file_to_s3(file, bucket_name=S3_BUCKET, acl="public-read"):
    """
    Docs: http://boto3.readthedocs.io/en/latest/guide/s3.html
    """

    try:
        # print("upload")
        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={"ACL": "public-read", "ContentType": file.content_type},
        )

    except Exception as e:
        print("-_-_-_-_-_-_-_-_ UPLOAD FAILURE -_-_-_-_-_-_-_-_", e)
        return e

    return "{}{}".format(S3_LOCATION, file.filename)
