import pytest
from unittest.mock import patch

@pytest.fixture(autouse=True)
def mock_mongo():
    with patch("app.main.connect_to_mongo"), patch("app.main.close_mongo_connection"):
        yield
