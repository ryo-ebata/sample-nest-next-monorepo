-- PostgreSQL初期化スクリプト
-- このファイルはDockerコンテナ起動時に自動実行されます

-- データベースが存在しない場合は作成
-- (Docker Composeで既に作成されるため、ここでは不要)

-- 基本的な権限設定
GRANT ALL PRIVILEGES ON DATABASE sample_db TO sample_user;
GRANT ALL PRIVILEGES ON SCHEMA public TO sample_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO sample_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO sample_user;

-- 今後のテーブル作成時の権限も自動付与
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO sample_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO sample_user; 
